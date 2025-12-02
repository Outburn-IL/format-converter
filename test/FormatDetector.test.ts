import { describe, it, expect, beforeEach } from 'vitest';
import { FormatDetector } from '../src/FormatDetector';
import { ContentFormat, ContentType } from '../src/types';

describe('FormatDetector', () => {
  const formatDetector: FormatDetector = new FormatDetector();

  describe('detectFormat', () => {
    const cases = [
      {
        input: `{
  "text": {
    "status": "generated",
    "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p><b>Generated Narrative with Details</b></p><p><b>id</b>: f001</p><p><b>identifier</b>: 6323 (OFFICIAL)</p><p><b>status</b>: final</p><p><b>code</b>: Glucose [Moles/volume] in Blood <span>(Details : {LOINC code '15074-8' = 'Glucose [Moles/volume] in Blood', given as 'Glucose [Moles/volume] in Blood'})</span></p><p><b>subject</b>: <a>P. van de Heuvel</a></p><p><b>effective</b>: 02/04/2013 9:30:10 AM --&gt; (ongoing)</p><p><b>issued</b>: 03/04/2013 3:30:10 PM</p><p><b>performer</b>: <a>A. Langeveld</a></p><p><b>value</b>: 6.3 mmol/l<span> (Details: UCUM code mmol/L = 'mmol/L')</span></p><p><b>interpretation</b>: High <span>(Details : {http://terminology.hl7.org/CodeSystem/v3-ObservationInterpretation code 'H' = 'High', given as 'High'})</span></p><h3>ReferenceRanges</h3><table><tr><td>-</td><td><b>Low</b></td><td><b>High</b></td></tr><tr><td>*</td><td>3.1 mmol/l<span> (Details: UCUM code mmol/L = 'mmol/L')</span></td><td>6.2 mmol/l<span> (Details: UCUM code mmol/L = 'mmol/L')</span></td></tr></table></div>"
   
}`,
        format: ContentFormat.JSON
      },
      {
        input: `{
  "text" { 
    "status": "generated",
    "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p><b>Generated Narrative with Details</b></p><p><b>id</b>: f001</p><p><b>identifier</b>: 6323 (OFFICIAL)</p><p><b>status</b>: final</p><p><b>code</b>: Glucose [Moles/volume] in Blood <span>(Details : {LOINC code '15074-8' = 'Glucose [Moles/volume] in Blood', given as 'Glucose [Moles/volume] in Blood'})</span></p><p><b>subject</b>: <a>P. van de Heuvel</a></p><p><b>effective</b>: 02/04/2013 9:30:10 AM --&gt; (ongoing)</p><p><b>issued</b>: 03/04/2013 3:30:10 PM</p><p><b>performer</b>: <a>A. Langeveld</a></p><p><b>value</b>: 6.3 mmol/l<span> (Details: UCUM code mmol/L = 'mmol/L')</span></p><p><b>interpretation</b>: High <span>(Details : {http://terminology.hl7.org/CodeSystem/v3-ObservationInterpretation code 'H' = 'High', given as 'High'})</span></p><h3>ReferenceRanges</h3><table><tr><td>-</td><td><b>Low</b></td><td><b>High</b></td></tr><tr><td>*</td><td>3.1 mmol/l<span> (Details: UCUM code mmol/L = 'mmol/L')</span></td><td>6.2 mmol/l<span> (Details: UCUM code mmol/L = 'mmol/L')</span></td></tr></table></div>"
  }
}`,
        format: ContentFormat.JSON
      },
      {
        input: `{
  text": { 
    "status": "generated",
    "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p><b>Generated Narrative with Details</b></p><p><b>id</b>: f001</p><p><b>identifier</b>: 6323 (OFFICIAL)</p><p><b>status</b>: final</p><p><b>code</b>: Glucose [Moles/volume] in Blood <span>(Details : {LOINC code '15074-8' = 'Glucose [Moles/volume] in Blood', given as 'Glucose [Moles/volume] in Blood'})</span></p><p><b>subject</b>: <a>P. van de Heuvel</a></p><p><b>effective</b>: 02/04/2013 9:30:10 AM --&gt; (ongoing)</p><p><b>issued</b>: 03/04/2013 3:30:10 PM</p><p><b>performer</b>: <a>A. Langeveld</a></p><p><b>value</b>: 6.3 mmol/l<span> (Details: UCUM code mmol/L = 'mmol/L')</span></p><p><b>interpretation</b>: High <span>(Details : {http://terminology.hl7.org/CodeSystem/v3-ObservationInterpretation code 'H' = 'High', given as 'High'})</span></p><h3>ReferenceRanges</h3><table><tr><td>-</td><td><b>Low</b></td><td><b>High</b></td></tr><tr><td>*</td><td>3.1 mmol/l<span> (Details: UCUM code mmol/L = 'mmol/L')</span></td><td>6.2 mmol/l<span> (Details: UCUM code mmol/L = 'mmol/L')</span></td></tr></table></div>"
  }
}`,
        format: ContentFormat.JSON
      },
      {
        input: `{
  "text": {
    "status": "generated" 
    "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p><b>Generated Narrative with Details</b></p><p><b>id</b>: f001</p><p><b>identifier</b>: 6323 (OFFICIAL)</p><p><b>status</b>: final</p><p><b>code</b>: Glucose [Moles/volume] in Blood <span>(Details : {LOINC code '15074-8' = 'Glucose [Moles/volume] in Blood', given as 'Glucose [Moles/volume] in Blood'})</span></p><p><b>subject</b>: <a>P. van de Heuvel</a></p><p><b>effective</b>: 02/04/2013 9:30:10 AM --&gt; (ongoing)</p><p><b>issued</b>: 03/04/2013 3:30:10 PM</p><p><b>performer</b>: <a>A. Langeveld</a></p><p><b>value</b>: 6.3 mmol/l<span> (Details: UCUM code mmol/L = 'mmol/L')</span></p><p><b>interpretation</b>: High <span>(Details : {http://terminology.hl7.org/CodeSystem/v3-ObservationInterpretation code 'H' = 'High', given as 'High'})</span></p><h3>ReferenceRanges</h3><table><tr><td>-</td><td><b>Low</b></td><td><b>High</b></td></tr><tr><td>*</td><td>3.1 mmol/l<span> (Details: UCUM code mmol/L = 'mmol/L')</span></td><td>6.2 mmol/l<span> (Details: UCUM code mmol/L = 'mmol/L')</span></td></tr></table></div>"
  }
}`,
        format: ContentFormat.JSON
      },
      {
        input: ` 
  "text": {
    "status": "generated",
    "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p><b>Generated Narrative with Details</b></p><p><b>id</b>: f001</p><p><b>identifier</b>: 6323 (OFFICIAL)</p><p><b>status</b>: final</p><p><b>code</b>: Glucose [Moles/volume] in Blood <span>(Details : {LOINC code '15074-8' = 'Glucose [Moles/volume] in Blood', given as 'Glucose [Moles/volume] in Blood'})</span></p><p><b>subject</b>: <a>P. van de Heuvel</a></p><p><b>effective</b>: 02/04/2013 9:30:10 AM --&gt; (ongoing)</p><p><b>issued</b>: 03/04/2013 3:30:10 PM</p><p><b>performer</b>: <a>A. Langeveld</a></p><p><b>value</b>: 6.3 mmol/l<span> (Details: UCUM code mmol/L = 'mmol/L')</span></p><p><b>interpretation</b>: High <span>(Details : {http://terminology.hl7.org/CodeSystem/v3-ObservationInterpretation code 'H' = 'High', given as 'High'})</span></p><h3>ReferenceRanges</h3><table><tr><td>-</td><td><b>Low</b></td><td><b>High</b></td></tr><tr><td>*</td><td>3.1 mmol/l<span> (Details: UCUM code mmol/L = 'mmol/L')</span></td><td>6.2 mmol/l<span> (Details: UCUM code mmol/L = 'mmol/L')</span></td></tr></table></div>"
  }
}`,
        format: ContentFormat.JSON
      },
      {
        input: `{
  "text": {
    "status": "generated",
    "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p><b>Generated Narrative with Details</b></p><p><b>id</b>: f001</p><p><b>identifier</b>: 6323 (OFFICIAL)</p><p><b>status</b>: final</p><p><b>code</b>: Glucose [Moles/volume] in Blood <span>(Details : {LOINC code '15074-8' = 'Glucose [Moles/volume] in Blood', given as 'Glucose [Moles/volume] in Blood'})</span></p><p><b>subject</b>: <a>P. van de Heuvel</a></p><p><b>effective</b>: 02/04/2013 9:30:10 AM --&gt; (ongoing)</p><p><b>issued</b>: 03/04/2013 3:30:10 PM</p><p><b>performer</b>: <a>A. Langeveld</a></p><p><b>value</b>: 6.3 mmol/l<span> (Details: UCUM code mmol/L = 'mmol/L')</span></p><p><b>interpretation</b>: High <span>(Details : {http://terminology.hl7.org/CodeSystem/v3-ObservationInterpretation code 'H' = 'High', given as 'High'})</span></p><h3>ReferenceRanges</h3><table><tr><td>-</td><td><b>Low</b></td><td><b>High</b></td></tr><tr><td>*</td><td>3.1 mmol/l<span> (Details: UCUM code mmol/L = 'mmol/L')</span></td><td>6.2 mmol/l<span> (Details: UCUM code mmol/L = 'mmol/L')</span></td></tr></table></div>"
   
}`,
        format: ContentFormat.JSON
      },
      {
        input: `
<address attribute1="foo">
        <extension url="http://hl7.org/fhir/StructureDefinition/geolocation">
            <extension url="longitude">
                <valueDecimal value="34.764885" />
            </extension>
            <extension url="latitude">
                <valueDecimal value="32.058317" />
            </extension>
        </extension>
</address>`,
        format: ContentFormat.XML
      },
      {
        input: `
<observation classCode="OBS" moodCode="EVN">
  <templateId root="2.16.840.1.113883.10.20.22.4.31" />
  <!-- Age observation -->
  <code code="445518008" 
        codeSystem="2.16.840.1.113883.6.96"
        displayName="Age At Onset" />
  <statusCode code="completed" />
  <value xsi:type="PQ" value="57" unit="a" />
</observation>`,
        format: ContentFormat.XML
      },
      {
        input: `
<tst1:Patient xmlns:tst1="http://test.tst.example.com/HIJ/FIRE/test1.xsd" xmlns:tst2="http://test.tst.example.com/HIJ/FIRE/test2.xsd" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <tst2:Header>
    <tst2:TransactionID>kdkdkdkdkdkdkdk</tst2:TransactionID>
    <tst2:TransactionName>TBD</tst2:TransactionName>
    <tst2:HospitalCode>09909</tst2:HospitalCode>
    <tst2:EventType>CREATE</tst2:EventType>
    <tst2:EventDateTime>2024-07-10T11:31:34.959+03:00</tst2:EventDateTime>
  </tst2:Header>
  <tst1:CreatePatient>
    <tst1:PatientID>0000000026</tst1:PatientID>
    <tst1:HMOCode>11</tst1:HMOCode>
    <tst1:HMODesc>כללית</tst1:HMODesc>
    <tst1:BirthCountryCode/>
    <tst1:GenderChange>true</tst1:GenderChange>
    <tst1:NationalityCode/>
    <tst1:NationalityDesc/>
    <tst1:PassportID/>
    <tst1:PhoneType>
      <tst1:PhoneNum>052-9999999</tst1:PhoneNum>
      <tst1:Priority>1</tst1:Priority>
    </tst1:PhoneType>
    <tst1:PhoneType>
      <tst1:PhoneNum>04-8888888</tst1:PhoneNum>
      <tst1:Priority>2</tst1:Priority>
    </tst1:PhoneType>
    <tst1:AddressType>
      <tst1:ResidenceCountry>IL</tst1:ResidenceCountry>
      <tst1:BuildingNum/>
      <tst1:EntranceID/>
      <tst1:DepartmentNum/>
      <tst1:CityCodeID>4000</tst1:CityCodeID>
    </tst1:AddressType>
  </tst1:CreatePatient>
</tst1:Patient>
`,
        format: ContentFormat.XML
      },
      {
        input: `
<Observation xmlns="http://hl7.org/fhir">
  <id value="f001"/> <text> <status value="generated"/> <div xmlns="http://www.w3.org/1999/xhtml"><p> <b> Generated Narrative with Details</b> </p> <p> <b> id</b> : f001</p> </div> </text> <identifier> 
    <use value="official"/> 
    <system value="http://www.bmc.nl/zorgportal/identifiers/observations"/> 
    <value value="6323"/> 
  </identifier> 
  <status value="final"/> 
  <code> 
    <coding> 
      <system value="http://loinc.org"/> 
      <code value="15074-8"/> 
      <display value="Glucose [Moles/volume] in Blood"/> 
    </coding> 
  </code> 
  <subject> 
    <reference value="Patient/f001"/> 
    <display value="P. van de Heuvel"/> 
  </subject> 
  <effectivePeriod> 
    <start value="2013-04-02T09:30:10+01:00"/> 
  </effectivePeriod> 
  <issued value="2013-04-03T15:30:10+01:00"/> 
  <performer> 
    <reference value="Practitioner/f005"/> 
    <display value="A. Langeveld"/> 
  </performer> 
  <valueQuantity> 
    <value value="6.3"/> 
    <unit value="mmol/l"/> 
    <system value="http://unitsofmeasure.org"/> 
    <code value="mmol/L"/> 
  </valueQuantity> 
</Observation> 
    `,
        format: ContentFormat.XML
      },
      {
        input: `
<?xml version="1.0" encoding="UTF-8"?>

<Observation xmlns="http://hl7.org/fhir">
  <id value="f001"/>
  <status value="final"/> 
</Observation> 
    `,
        format: ContentFormat.XML
      },
      {
        input: 'given,family\r\na,B',
        format: ContentFormat.CSV
      },
      {
        input: '<root><given>a</given><family value="B" /></root>',
        format: ContentFormat.XML
      },
      {
        input: `field1, field2, field3, field4
1,a,true,null
2,b,false
3,c,null,null
4,1,true,a`,
        format: ContentFormat.CSV
      },
      {
        input: `a, b, c, d
1
2,b
3,c,null,
4,1
1,2,3,4,5,6,7
`,
        format: ContentFormat.CSV
      },
      {
        input: `a
1
2
3
4
5
`,
        format: ContentFormat.CSV
      },
      {
        input: `a
1
2
3
4,5
5
`,
        format: ContentFormat.CSV
      },
      {
        input: `MSH|^~\&|HIS|Hospital1|IRIS||202304062045||ADT^A01|d6b56e78-f6d1-4c82-9a9c-7e777a93e1af|P|2.5.1|||
EVN|A01|202304042045|||||
PID|58705|58705|1^^^^MR||DemoTest1^DemoTest1||20220101|F|||Oren Street^^Haifa|IL|09-12345678|054-123456789||||Account1||||||||||||||||||||
PV1|1|E|ER^101^1^DemoHospital|E||||||MED||||7|||37^DISNEY^WALT^^^^^^DemoHospital^^^^CI|2|Admission1^^^DemoHospital|4|||||||||||||||||||1||G|||20050110||||||
DG1|1|DH|ABDPAIN^Abdominal pain^DH|Abdominal Pain |20230406|A| IN1|1|MEDICARE|3|MEDICARE||||||||20230406|Condition1|unconfirmed| 
IN1|2|InsuranceIdentifier1|10|Health Insurance Global|PO BOX 94776^^HOLLYWOOD^CA^441414776||8003621279|PUBSUMB|||Cartoon Ducks Inc||||7|DUCK^DONALD^D|SEL|19241010|111 DUCK ST^^FOWL^CA^999990000|||||||||||||||||056269770||||||PT|M|111^DUCK ST^^FOWL^CA^999990000|||||1`,
        format: ContentFormat.HL7
      },
      {
        input: `MSH|^~\&|1^Autolab^3.02|110^some_place|34^HL7_PDF|2400^HL7_PDF|20240726083203||ORU^R01|12345678|P|2.3||0^^||||||5||
ORC||2222222222^^^^^^^|||CM||||20240725154900|207^first^last^^^^||1234567^first^last|||||general^^^^||^|N|N|555555555|N^Y||403aa3gec5fb33efd666666cd45b1e5a|
NTE||O| Clinical_diagnosis:MDS|0|
OBR|1||830814256^^^^^^^||||20240718195000||0^|^^auto^^^^||||20240718210300|0^^^^^^^||||||||||||^^0^^^^^^|||||||||||||||||0|4^green^^^^|1^Blood^^^^|
NTE|15151515|O|new_sample|1|
OBX|10|TX|0813321000^esccol^^^Escherichia coli^||.|0^""^^^^|^|N|||F|M|104^714^ Micro_lab|20240725154900|9999^Micro|1234567-8^First^last^^^^^||0|0^^^^^|^AutoComm^16^^^^^|9999^Micro^^^^|207^general^^^^||0810109809^genct^^^^||1|^system^routing^^^^^|20240725150000|^^|N|1111111111|2222222222|33333333333|
NTE|15471137|O|updated_result|1|
`,
        format: ContentFormat.HL7
      },
      {
        input: `MSH|^~\&|VitalSignsDevice|Hospital1|IRIS||202304052045||ORU^R01|0c810ec6-c06a-4505-88b5-73841470b9d1|P|2.5.1||||||||
PID|58705|58705|1^^^^MR||DemoTest1^DemoTest1||20220101|F|||Oren Street^^Haifa|IL|09-12345678|054-123456789||||Account1||||||||||||||||||||
PV1||1|CE||||12345^Doctor^Doctor||||||||||||Admission1^^^DemoHospital
OBX|1|NM|8480-6^Systolic blood pressure^LN||125|mm(hg)|100-120|||N|F||||||||202304052150
OBX|2|NM|8462-4^Diastolic blood pressure^LN||95|mm(hg)|60-90|||N|F||||||||202304052150
`,
        format: ContentFormat.HL7
      },
      {
        input: `MSH|^~\&|1^Autolab^3.02|110^some_place|34^HL7_PDF|2400^HL7_PDF|20240726083203||ORU^R01|12345678|P|2.3||0^^||||||5||
OBX|10|TX|0813321000^esccol^^^Escherichia coli^||.|0^""^^^^|^|N|||F|M|104^714^ Micro_lab|20240725154900|9999^Micro|1234567-8^First^last^^^^^||0|0^^^^^|^AutoComm^16^^^^^|9999^Micro^^^^|207^general^^^^||0810109809^genct^^^^||1|^system^routing^^^^^|20240725150000|^^|N|1111111111|2222222222|33333333333|
`,
        format: ContentFormat.HL7
      },
      {
        input: `<tns4:Patient xmlns:tns4="http://ABC.DEF.GHI.JKL.MN/TST/FHIR/Patient.xsd" xmlns:ns9="http://example.org/SharedResources/XSD/dsfdsfsd.xsd" xmlns:tib="http://example.org/bw/xslt/custom-functions" xmlns:tns="http://www.example.org/BuildMessage" xmlns:tns10="http://www.example.org/namespaces/fe34604e-1f06-492b-bb7d-6b0bcefd57" xmlns:tns11="http://www.example.org/namespaces/5cfgd8d-3743-4aee-8ff1-ba54353454a+input" xmlns:tns2="http://www.example.org/PatientNameParts" xmlns:tns5="http://example.org/Header.xsd" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <tns5:Header>
    <tns5:TransactionID>aaaaaaaaa</tns5:TransactionID>
    <tns5:TransactionName>TBD</tns5:TransactionName>
    <tns5:MessageID>gsfgsdgfsfgsfdg</tns5:MessageID>
    <tns5:MessageName>TBD</tns5:MessageName>
    <tns5:EventType>CREATE</tns5:EventType>
    <tns5:EventDateTime>2024-07-10T11:31:34.959+03:00</tns5:EventDateTime>
  </tns5:Header>
  <tns4:CreatePatient>
    <tns4:PatientID>0001432170</tns4:PatientID>
    <tns4:HMOCode>99</tns4:HMOCode>
    <tns4:HMODesc>משהו</tns4:HMODesc>
    <tns4:FatherName>משהו</tns4:FatherName>
    <tns4:MotherName>משהוית</tns4:MotherName>
    <tns4:BirthCountryCode/>
    <tns4:GenderChange>true</tns4:GenderChange>
    <tns4:NationalityCode/>
    <tns4:NationalityDesc/>
    <tns4:PatientExtnrID>123654774</tns4:PatientExtnrID>
    <tns4:PatienאAcmeID>987654</tns4:PatienאAcmeID>
    <tns4:PassportID/>
    <tns4:TemporaryIdentifierID>ZZZZ55555</tns4:TemporaryIdentifierID>
    <tns4:IsActive>true</tns4:IsActive>
    <tns4:LastName>מושמוש</tns4:LastName>
    <tns4:FirstName>מישקה</tns4:FirstName>
    <tns4:TitleName>ד"ר</tns4:TitleName>
    <tns4:LastNameEng>Mushmush</tns4:LastNameEng>
    <tns4:FirstNameEng>Mishka</tns4:FirstNameEng>
    <tns4:PhoneType>
      <tns4:PhoneNum>052-3334444</tns4:PhoneNum>
      <tns4:Priority>1</tns4:Priority>
    </tns4:PhoneType>
    <tns4:PhoneType>
      <tns4:PhoneNum>04-1234567</tns4:PhoneNum>
      <tns4:Priority>2</tns4:Priority>
    </tns4:PhoneType>
    <tns4:EmailAddress>my@gmail.com</tns4:EmailAddress>
    <tns4:Gender>male</tns4:Gender>
    <tns4:BirthDate>19740101</tns4:BirthDate>
    <tns4:IsDeceased>false</tns4:IsDeceased>
    <tns4:AddressType>
      <tns4:ResidenceCountry>IL</tns4:ResidenceCountry>
      <tns4:StreetName>לייבוביץ' 1 דור כרמל</tns4:StreetName>
      <tns4:BuildingNum/>
      <tns4:EntranceID/>
      <tns4:DepartmentNum/>
      <tns4:CityCodeID>4000</tns4:CityCodeID>
      <tns4:CityDesc>חיפה</tns4:CityDesc>
      <tns4:ZipCode>3258701</tns4:ZipCode>
    </tns4:AddressType>
    <tns4:FamilyStatus>S</tns4:FamilyStatus>
    <tns4:Language>B</tns4:Language>
    <tns4:IsConfidental>false</tns4:IsConfidental>
    <tns4:IsDonor>false</tns4:IsDonor>
    <tns4:IsDeaf>false</tns4:IsDeaf>
  </tns4:CreatePatient>
</tns4:Patient>`,
        format: ContentFormat.XML
      },
      {
        input: `<tns4:Patient xmlp://ABC.DEF.GHI.JKL.MN/TST/FHIR/Patient.xsd" xmlns:ns9="http://example.org/SharedResources/XSD/dsfdsfsd.xsd" xmlns:tib="http://example.org/bw/xslt/custom-functions" xmlns:tns="http://www.example.org/BuildMessage" xmlns:tns10="http://www.example.org/namespaces/fe34604e-1f06-492b-bb7d-6b0bcefd57" xmlns:tns11="http://www.example.org/namespaces/5cfgd8d-3743-4aee-8ff1-ba54353454a+input" xmlns:tns2="http://www.example.org/PatientNameParts" xmlns:tns5="http://example.org/Header.xsd" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <tns5:Header>
    <tns5:TransactionID>aaaaaaaaa</tns5:TransactionID>
    <tns5:TransactionName>TBD</tns5:TransactionName>
    <tns5:MessageID>gsfgsdgfsfgsfdg</tns5:MessageID>
    <tns5:MessageName>TBD</tns5:MessageName>
    <tns5:EventType>CREATE</tns5:EventType>
    <tns5:EventDateTime>2024-07-10T11:31:34.959+03:00</tns5:EventDateTime>
  </tns5:Header>
  <tns4:CreatePatient>
    <tns4:PatientID>0001432170</tns4:PatientID>
    <tns4:HMOCode>99</tns4:HMOCode>
    <tns4:HMODesc>משהו</tns4:HMODesc>
    <tns4:FatherName>משהו</tns4:FatherName>
    <tns4:MotherName>משהוית</tns4:MotherName>
    <tns4:BirthCountryCode/>
    <tns4:GenderChange>true</tns4:GenderChange>
    <tns4:NationalityCode/>
    <tns4:NationalityDesc/>
    <tns4:PatientExtnrID>123654774</tns4:PatientExtnrID>
    <tns4:PatienאAcmeID>987654</tns4:PatienאAcmeID>
    <tns4:PassportID/>
    <tns4:TemporaryIdentifierID>ZZZZ55555</tns4:TemporaryIdentifierID>
    <tns4:IsActive>true</tns4:IsActive>
    <tns4:LastName>מושמוש</tns4:LastName>
    <tns4:FirstName>מישקה</tns4:FirstName>
    <tns4:TitleName>ד"ר</tns4:TitleName>
    <tns4:LastNameEng>Mushmush</tns4:LastNameEng>
    <tns4:FirstNameEng>Mishka</tns4:FirstNameEng>
    <tns4:PhoneType>
      <tns4:PhoneNum>052-3334444</tns4:PhoneNum>
      <tns4:Priority>1</tns4:Priority>
    </tns4:PhoneType>
    <tns4:PhoneType>
      <tns4:PhoneNum>04-1234567</tns4:PhoneNum>
      <tns4:Priority>2</tns4:Priority>
    </tns4:PhoneType>
    <tns4:EmailAddress>my@gmail.com</tns4:EmailAddress>
    <tns4:Gender>male</tns4:Gender>
    <tns4:BirthDate>19740101</tns4:BirthDate>
    <tns4:IsDeceased>false</tns4:IsDeceased>
    <tns4:AddressType>
      <tns4:ResidenceCountry>IL</tns4:ResidenceCountry>
      <tns4:StreetName>לייבוביץ' 1 דור כרמל</tns4:StreetName>
      <tns4:BuildingNum/>
      <tns4:EntranceID/>
      <tns4:DepartmentNum/>
      <tns4:CityCodeID>4000</tns4:CityCodeID>
      <tns4:CityDesc>חיפה</tns4:CityDesc>
      <tns4:ZipCode>3258701</tns4:ZipCode>
    </tns4:AddressType>
    <tns4:FamilyStatus>S</tns4:FamilyStatus>
    <tns4:Language>B</tns4:Language>
    <tns4:IsConfidental>false</tns4:IsConfidental>
    <tns4:IsDonor>false</tns4:IsDonor>
    <tns4:IsDeaf>false</tns4:IsDeaf>
  </tns4:CreatePatient>
</tns4:Patient>`,
        format: ContentFormat.XML
      },
      {
        input: `<?xml version="1.0"?>
<Catalog>
   <Book id="bk101">
      <Author>Garghentini, Davide</Author>
      <Title>XML Developer's Guide</Title>
      <Genre>Computer</Genre>
      <Price>44.95</Price>
      <PublishDate>2000-10-01</PublishDate>
      <Description>An in-depth look at creating applications
      with XML.</Description>
   </Book>
   <Book id="bk102">
      <Author>Garcia, Debra</Author>
      <Title>Midnight Rain</Title>
      <Genre>Fantasy</Genre>
      <Price>5.95</Price>
      <PublishDate>2000-12-16</PublishDate>
      <Description>A former architect battles corporate zombies,
      an evil sorceress, and her own childhood to become queen
      of the world.</Description>
   </Book>
</Catalog>`,
        format: ContentFormat.XML
      },
      {
        input: `{
  "mrn": "PP875023983",
  "status": "active",
  "ssn": "123-45-6789",
  "passport_number": "7429184766",
  "passport_country": "USA",
  "first_name": "Jessica",
  "last_name": "Rabbit",
  "birth_date": "1988-06-22",
  "sex": "F",
  "address": {
    "city_name": "Orlando",
    "state": "FL",
    "street_name": "Buena Vista",
    "house_number": 1375,
    "zip_code": "3456701",
    "lat": 28.3519592,
    "long": -81.417283
  },
  "phones": [
    {
      "type": "HOME",
      "number": "+1 (407) 8372859"
    },
    {
      "type": "CELL",
      "number": "+1 (305) 9831195"
    }
  ],
  "primary_doctor": {
    "full_name": "Dr. Dolittle",
    "license": "1-820958"
  }
}`,
        format: ContentFormat.JSON
      },
      {
        input: `aaa,aa
1
1,2`,
        format: ContentFormat.CSV
      },
      {
        input: `aaa,aa,5
3,f
1,2
5,5,5,7`,
        format: ContentFormat.CSV
      },
      {
        input: `aaa,aa,5
3,f
1 
5,5,5,7`,
        format: ContentFormat.CSV
      },
      {
        input: `Field1
1
2
3
4`,
        format: ContentFormat.CSV
      },
      {
        input: `  "mrn": "PP875023983",
  "status": "active",
  "ssn": "123-45-6789",
  "passport_number": "7429184766",
  "passport_country": "USA",
  "first_name": "Jessica",
  "last_name": "Rabbit",
  "birth_date": "1988-06-22",
  "sex": "F",
  "address": {
    "city_name": "Orlando",
    "state": "FL",
    "street_name": "Buena Vista",
    "house_number": 1375,
    "zip_code": "3456701",
    "lat": 28.3519592,
    "long": -81.417283
  },
  "phones": [
    {
      "type": "HOME",
      "number": "+1 (407) 8372859"
    },
    {
      "type": "CELL",
      "number": "+1 (305) 9831195"
    }
  ],
  "primary_doctor": {
    "full_name": "Dr. Dolittle",
    "license": "1-820958"
  }
}`,
        format: ContentFormat.JSON
      }
    ];

    it('should detect formats correctly for all test cases', () => {
      cases.forEach((testCase, index) => {
        const result = formatDetector.detectFormat(testCase.input);
        expect(result, `Case ${index} failed, expected ${testCase.format} but got ${result}`)
          .toBe(testCase.format);
      });
    });

    // Individual test cases for better debugging
    it('should detect valid JSON', () => {
      const validJson = `{
        "text": {
          "status": "generated",
          "div": "<div>content</div>"
        }
      }`;
      expect(formatDetector.detectFormat(validJson)).toBe(ContentFormat.JSON);
    });

    it('should detect malformed JSON as JSON-like', () => {
      const malformedJson = `{
        "text" { 
          "status": "generated"
        }
      }`;
      expect(formatDetector.detectFormat(malformedJson)).toBe(ContentFormat.JSON);
    });

    it('should detect HL7 v2 messages', () => {
      const hl7Message = 'MSH|^~\\&|HIS|Hospital1|IRIS||202304062045||ADT^A01|d6b56e78-f6d1-4c82-9a9c-7e777a93e1af|P|2.5.1|||';
      expect(formatDetector.detectFormat(hl7Message)).toBe(ContentFormat.HL7);
    });

    it('should detect XML with namespaces', () => {
      const xmlWithNamespaces = `<Patient xmlns="http://hl7.org/fhir">
        <id value="f001"/>
        <status value="final"/> 
      </Patient>`;
      expect(formatDetector.detectFormat(xmlWithNamespaces)).toBe(ContentFormat.XML);
    });

    it('should detect XML with XML declaration', () => {
      const xmlWithDeclaration = `<?xml version="1.0" encoding="UTF-8"?>
      <root>
        <element>value</element>
      </root>`;
      expect(formatDetector.detectFormat(xmlWithDeclaration)).toBe(ContentFormat.XML);
    });

    it('should detect simple CSV', () => {
      const simpleCsv = `given,family
      a,B`;
      expect(formatDetector.detectFormat(simpleCsv)).toBe(ContentFormat.CSV);
    });

    it('should detect single column CSV', () => {
      const singleColumnCsv = `Field1
      1
      2
      3
      4`;
      expect(formatDetector.detectFormat(singleColumnCsv)).toBe(ContentFormat.CSV);
    });

    // csv with only one header then comma: a,
    it('should detect CSV with single header and comma', () => {
      const csvSingleHeaderComma = 'a,';
      expect(formatDetector.detectFormat(csvSingleHeaderComma)).toBe(ContentFormat.CSV);
    });

    it('should handle empty or null input', () => {
      expect(formatDetector.detectFormat('')).toBe(ContentFormat.UNKNOWN);
      expect(formatDetector.detectFormat('   ')).toBe(ContentFormat.UNKNOWN);
    });

    it('should handle malformed XML gracefully', () => {
      const malformedXml = `<tns4:Patient xmlp://ABC.DEF.GHI.JKL.MN/TST/FHIR/Patient.xsd">
        <content>test</content>
      </tns4:Patient>`;
      // This should still be detected as XML due to the tag structure
      expect(formatDetector.detectFormat(malformedXml)).toBe(ContentFormat.XML);
    });
  });

  describe('detectContentType', () => {
    it('should convert format to content type', () => {
      const jsonInput = '{"key": "value"}';
      const contentType = formatDetector.detectContentType(jsonInput);
      expect(contentType).toBe(ContentType.JSON);
    });
  });

  describe('detectEditorLanguage', () => {
    it('should return JSON language for JSON format', () => {
      const jsonInput = '{"key": "value"}';
      const editorLanguage = formatDetector.detectEditorLanguage(jsonInput);
      expect(editorLanguage).toBe('json');
    });

    it('should return XML language for XML format', () => {
      const xmlInput = '<root><element>value</element></root>';
      const editorLanguage = formatDetector.detectEditorLanguage(xmlInput);
      expect(editorLanguage).toBe('xml');
    });

    it('should return plaintext for other formats', () => {
      const csvInput = 'a,b\n1,2';
      const csvEditorLanguage = formatDetector.detectEditorLanguage(csvInput);
      expect(csvEditorLanguage).toBe('plaintext');

      const hl7Input = 'MSH|^~\\&|HIS|Hospital1|IRIS||202304062045||ADT^A01|d6b56e78-f6d1-4c82-9a9c-7e777a93e1af|P|2.5.1|||';
      const hl7EditorLanguage = formatDetector.detectEditorLanguage(hl7Input);
      expect(hl7EditorLanguage).toBe('plaintext');
    });
  });
});