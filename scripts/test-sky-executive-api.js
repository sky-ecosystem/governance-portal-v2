/**
 * Simple test script to verify Sky executive API endpoint
 * Run with: node scripts/test-sky-executive-api.js
 */

const fetch = require('node-fetch');

async function testSkyExecutiveAPI() {
  console.log('Testing Sky Executive API...\n');
  
  // Test 1: Test Sky executive detail endpoint
  try {
    console.log('1. Testing Sky executive detail endpoint...');
    const response = await fetch('https://vote.sky.money/api/executive', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      // Add timeout
      timeout: 10000
    });
    
    if (!response.ok) {
      console.log(`❌ Sky executives API returned status: ${response.status}`);
      return false;
    }
    
    const data = await response.json();
    console.log('✅ Sky executives API is working');
    console.log(`   Found ${data.length} executives`);
    
    if (data.length > 0) {
      const firstExec = data[0];
      console.log(`   First executive key: ${firstExec.key}`);
      console.log(`   First executive title: ${firstExec.title}`);
      
      // Test 2: Test individual executive detail
      console.log('\n2. Testing individual executive detail...');
      const detailResponse = await fetch(`https://vote.sky.money/api/executive/${firstExec.key}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 10000
      });
      
      if (!detailResponse.ok) {
        console.log(`❌ Sky executive detail API returned status: ${detailResponse.status}`);
        return false;
      }
      
      const detailData = await detailResponse.json();
      console.log('✅ Sky executive detail API is working');
      console.log(`   Executive title: ${detailData.title}`);
      console.log(`   Executive key: ${detailData.key}`);
      console.log(`   Executive address: ${detailData.address}`);
      console.log(`   SKY support: ${detailData.spellData?.skySupport || 'N/A'}`);
      console.log(`   Has been cast: ${detailData.spellData?.hasBeenCast || false}`);
      console.log(`   Has been scheduled: ${detailData.spellData?.hasBeenScheduled || false}`);
      console.log(`   Supporters count: ${detailData.supporters?.length || 0}`);
      
      return true;
    } else {
      console.log('⚠️  No executives found in Sky API');
      return false;
    }
    
  } catch (error) {
    console.log(`❌ Error testing Sky executive API: ${error.message}`);
    return false;
  }
}

// Test our API endpoint structure
async function testAPIStructure() {
  console.log('\n3. Testing expected API structure...');
  
  try {
    const response = await fetch('https://vote.sky.money/api/executive', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 10000
    });
    
    if (!response.ok) {
      console.log(`❌ API structure test failed: ${response.status}`);
      return false;
    }
    
    const data = await response.json();
    
    if (data.length > 0) {
      const exec = data[0];
      
      // Check required fields
      const requiredFields = ['title', 'proposalBlurb', 'key', 'address', 'date', 'active', 'proposalLink', 'spellData'];
      const missingFields = requiredFields.filter(field => !(field in exec));
      
      if (missingFields.length > 0) {
        console.log(`❌ Missing required fields: ${missingFields.join(', ')}`);
        return false;
      }
      
      // Check spellData fields
      const spellDataFields = ['hasBeenCast', 'hasBeenScheduled', 'skySupport'];
      const missingSpellFields = spellDataFields.filter(field => !(field in exec.spellData));
      
      if (missingSpellFields.length > 0) {
        console.log(`❌ Missing spellData fields: ${missingSpellFields.join(', ')}`);
        return false;
      }
      
      console.log('✅ API structure matches expected format');
      return true;
    } else {
      console.log('⚠️  No executives to test structure');
      return false;
    }
    
  } catch (error) {
    console.log(`❌ Error testing API structure: ${error.message}`);
    return false;
  }
}

// Run tests
async function runTests() {
  console.log('🚀 Starting Sky Executive API Tests\n');
  
  const apiTest = await testSkyExecutiveAPI();
  const structureTest = await testAPIStructure();
  
  console.log('\n📊 Test Results:');
  console.log(`   API Functionality: ${apiTest ? '✅' : '❌'}`);
  console.log(`   API Structure: ${structureTest ? '✅' : '❌'}`);
  
  if (apiTest && structureTest) {
    console.log('\n🎉 All tests passed! Sky Executive API is ready for integration.');
  } else {
    console.log('\n⚠️  Some tests failed. Please check the API implementation.');
  }
}

// Only run if this file is executed directly
if (require.main === module) {
  runTests().catch(console.error);
}

module.exports = { testSkyExecutiveAPI, testAPIStructure };