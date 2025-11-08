#!/usr/bin/env node
/**
 * Test script to list recent executions from n8n using the MCP handler
 */

import { handleListExecutions } from '../mcp/handlers-n8n-manager';

async function testListExecutions() {
  try {
    console.log('🔍 Fetching recent executions from n8n...\n');

    // Call with default parameters to get recent executions
    const result = await handleListExecutions({
      limit: 20
    });

    if (result.success && result.data) {
      const { executions, returned, hasMore, nextCursor } = result.data;

      console.log(`✅ Successfully retrieved ${returned} recent executions\n`);
      console.log('=' .repeat(80));
      console.log('RECENT EXECUTIONS:');
      console.log('=' .repeat(80));

      executions.forEach((exec: any, index: number) => {
        console.log(`\n${index + 1}. Execution ID: ${exec.id}`);
        console.log(`   Workflow: ${exec.workflowId || 'N/A'}`);
        console.log(`   Status: ${exec.status}`);
        console.log(`   Mode: ${exec.mode || 'N/A'}`);
        console.log(`   Started: ${exec.startedAt || 'N/A'}`);
        console.log(`   Stopped: ${exec.stoppedAt || 'N/A'}`);
        if (exec.duration !== undefined) {
          console.log(`   Duration: ${exec.duration}ms`);
        }
      });

      console.log(`\n${'=' .repeat(80)}`);
      console.log(`\nTotal returned: ${returned}`);
      console.log(`Has more results: ${hasMore}`);
      if (nextCursor) {
        console.log(`Next cursor: ${nextCursor}`);
      }
    } else {
      console.log('❌ Error:', result.error);
    }
  } catch (error) {
    console.error('❌ Error fetching executions:', error);
    process.exit(1);
  }
}

testListExecutions();
