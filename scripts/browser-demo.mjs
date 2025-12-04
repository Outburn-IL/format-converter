#!/usr/bin/env node

import { spawn } from 'child_process';
import os from 'os';

console.log('\n🔄 Starting Format Converter Browser Demo Server...\n');

// Start the serve command
const serve = spawn('npx', ['serve', '.', '-p', '8080'], {
  stdio: ['ignore', 'pipe', 'pipe'],
  shell: os.platform() === 'win32'
});

let serverStarted = false;

serve.stdout.on('data', (data) => {
  const output = data.toString();

  if (output.includes('http://') && !serverStarted) {
    serverStarted = true;
    const port = output.match(/:(\d+)/)?.[1] || '8080';

    console.log('✅ Server running! Click the links below:\n');
    console.log(`📄 Simple Example:     \x1b[36mhttp://localhost:${port}/demo/simple-example.html\x1b[0m`);
    console.log(`🔄 Format Converter:   \x1b[36mhttp://localhost:${port}/demo/format-converter.html\x1b[0m`);
    console.log(`⚕️ HL7 Parser:          \x1b[36mhttp://localhost:${port}/demo/hl7-parser.html\x1b[0m`);
    console.log(`🕵️ Format Detector:    \x1b[36mhttp://localhost:${port}/demo/format-detector.html\x1b[0m`);
    // test-browser-build
    console.log(`🧪 Browser Build Test:  \x1b[36mhttp://localhost:${port}/demo/test-browser-build.html\x1b[0m`);
    console.log('\n💡 Press Ctrl+C to stop the server\n');
  }
});

serve.stderr.on('data', (data) => {
  const output = data.toString();
  if (!output.includes('WARNING')) {
    console.error(output);
  }
});

serve.on('error', (error) => {
  console.error('Failed to start server:', error.message);
  process.exit(1);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n👋 Stopping server...');
  serve.kill('SIGINT');
  setTimeout(() => process.exit(0), 1000);
});

process.on('SIGTERM', () => {
  serve.kill('SIGTERM');
  setTimeout(() => process.exit(0), 1000);
});