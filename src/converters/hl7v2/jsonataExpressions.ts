import jsonata from 'jsonata';

export const expressions = {

  v2jsonExpression: jsonata(`(
    $rawJson := $v2parse($);
    $v2version := $rawJson.segments[0].\`12\`;

    $dtToIso := function($dt){(
      $y := $substring($dt,0,4);
      $m := $substring($dt,4,2);
      $d := $substring($dt,6,2);
      $join([$y,$m,$d],'-')
    )};

    $dtmToIso := function($dtm){(
      $dt := $dtToIso($dtm);
      $hh := $substring($dtm,8,2);
      $mm := $substring($dtm,10,2);
      $ss := $substring($dtm,12,2);
      $tm := $join([($hh!=''?$hh),($mm!=''?$mm),($ss!=''?$ss)],':');
      $dt & ($tm!=''? 'T' & $tm)
    )};

    $parseValue := function($value, $datatype){(    
      $value = '' 
      ? 
        undefined 
      : $value.(
          $datatype = 'DT' ? $dtToIso($) : ($datatype = 'DTM' ? $dtmToIso($) : $)
        )
    )};

    $translateSubfield := function($subfield, $datatypeDef, $sfi){(
      $subfieldDef := $datatypeDef.subfields[$sfi];
      $subfieldDesc := $subfieldDef.desc;
      $subfieldDatatype := $subfieldDef.datatype;
      $sfDataTypeDef := $getDatatypeDef($subfieldDatatype, $v2version);
      $isComplex := $count($sfDataTypeDef.subfields)>0;
      $hasChildren := $count($subfield.fields)>0;

      $value := (
        $isComplex = false 
        ? $parseValue($subfield.value, $subfieldDatatype)
        : (
          /* it's a complex type */
          $hasChildren 
          ? ( 
            /* input has children */
            $subfield.fields@$subsubfield#$ssfi.$translateSubfield($subsubfield, $sfDataTypeDef, $ssfi){
              $normalizeKey(name): value
            };
          )
          : ( 
            /* input doesn't have children */
            $translateSubfield({'value': $subfield.value}, $sfDataTypeDef, 0){
              $normalizeKey(name): value
            }
          )
        )      
      );

      {
        'name': $subfieldDesc,
        'value': $value != {} ? $value
      }
    )};

    $translateField := function($field, $segDef, $fieldIndex){(
      $fieldDef := $segDef.fields[$fieldIndex];
      $fieldDef := $exists($fieldDef)=false ? {'name': $segDef.segmentId & ($fieldIndex + 1)} : $fieldDef;
      $fieldDesc := $fieldDef.desc ? $fieldDef.desc : $fieldDef.name;
      $fieldDesc := $type($fieldDesc) = 'string' and $startsWith($fieldDesc,'Set ID - ') and $fieldIndex=0 ? 'SetID' : $fieldDesc;
      $fieldDatatype := $fieldDef.datatype;
      $datatypeDef := $getDatatypeDef($fieldDatatype, $v2version);
      $isEnc := $segDef.segmentId='MSH' and $fieldIndex=1;
      $isComplex := $count($datatypeDef.subfields)>0;
      $hasChildren := $count($field.fields)>0;

      $value := (
        $isEnc ? $field.value : (
          $isComplex = false 
          ? $parseValue($field.value, $fieldDatatype)
          : (
            /* it's a complex type */
            $hasChildren 
            ? ( 
              /* input has children */
              $field.fields@$subfield#$sfi.$translateSubfield($subfield, $datatypeDef, $sfi){
                $normalizeKey(name): value
              };
            )
            : ( 
              /* input doesn't have children */
              $translateSubfield({'value': $field.value}, $datatypeDef, 0){
                $normalizeKey(name): value
              }
            )
          )
        )
      );
      $value := $value = {} ? undefined : $value;
      
      {
        'name': $fieldDesc,
        'value': $value
      };
    )};

    $translateSegment := function($segment){(
      $line := $segment.MessageLine;
      $segId := $segment.\`0\`;
      $segDef := $getSegmentDef($segId, $v2version);
      $segment.fields#$i[$i>0].$translateField($, $segDef, $i-1){
        'SegmentDescription': $segDef.desc,
        'MessageLine': $line,
        $normalizeKey(name): value
      }
    )};
    
    $segmentsWithLines := $rawJson.segments#$line.($merge([$, {'MessageLine': $line+1}]));

    $segmentsWithLines@$s.$translateSegment($s){
      $s.\`0\`: $
    };
  )`),

  v2normalizeKey: jsonata(`(
    $cached := $lookup($keyMap, $);
    $exists($cached) = false 
      ? (
        $titleCased := ($split($initCap($replace($,"'", '')), ' ')~>$join);
        $dtmFixed := $titleCased.$replace('Date/Time', 'DateTime') ~> $replace('Date / Time', 'DateTime');$underscored := $replace($dtmFixed, /[-\+".()\\//]/, '_');
        $registerV2key($, $underscored);
        $underscored;
      )
      : ($cached);
  )`),

  initCap: jsonata(`(
    $words := $trim($)~>$split(" ");
    ($words.$initCapOnce($))~>$join(' ')
  )`)
};