# HOTMESS Troubleshooting Runbook

This runbook provides step-by-step troubleshooting procedures for common issues in the HOTMESS Vercel project.

## Quick Reference

### Common Error Codes

| Error | Cause | Solution |
|-------|-------|----------|
| 401/403 | Invalid Shopify credentials | Check `SHOPIFY_ACCESS_TOKEN` |
| 408/504 | Request timeout | Check network connectivity, Shopify API status |
| 429 | Rate limit exceeded | Implement backoff, reduce request frequency |
| 500 | Server error | Check logs, validate environment variables |

### Emergency Contacts

- **Development Team**: [Contact info]
- **Vercel Support**: [Support channel]
- **Shopify Partner Support**: [Support channel]

## Troubleshooting Procedures

### 1. API Endpoint Not Responding

**Symptoms:**
- `/api/schedule.ics` returns 500 or times out
- No response from API endpoints

**Diagnosis:**
```bash
# Check if service is running
curl -I https://your-domain.vercel.app/api/schedule.ics

# Check Vercel function logs
vercel logs --follow

# Test with minimal parameters
curl "https://your-domain.vercel.app/api/schedule.ics?limit=1"
```

**Resolution Steps:**

1. **Check Environment Variables**
   ```bash
   # Verify variables are set in Vercel
   vercel env ls
   
   # Test locally with env vars
   npm run dev
   curl http://localhost:3000/api/schedule.ics?limit=1
   ```

2. **Validate Shopify Connection**
   ```bash
   # Test Shopify API directly
   curl -H "X-Shopify-Access-Token: YOUR_TOKEN" \
        "https://YOUR_SHOP.myshopify.com/admin/api/2023-10/shop.json"
   ```

3. **Redeploy if Configuration is Correct**
   ```bash
   vercel --prod
   ```

### 2. Shopify Authentication Errors

**Symptoms:**
- 401 Unauthorized responses
- 403 Forbidden responses
- "Invalid access token" errors

**Diagnosis:**
```bash
# Check current token permissions
curl -H "X-Shopify-Access-Token: YOUR_TOKEN" \
     "https://YOUR_SHOP.myshopify.com/admin/api/2023-10/shop.json"

# Verify shop domain format
echo $SHOPIFY_SHOP_DOMAIN  # Should NOT include .myshopify.com
```

**Resolution Steps:**

1. **Verify Access Token**
   - Check token in Shopify Partner Dashboard
   - Ensure token has `read_orders` permission
   - Regenerate token if necessary

2. **Check Shop Domain Format**
   ```bash
   # Correct format
   SHOPIFY_SHOP_DOMAIN=mystore
   
   # Incorrect format
   SHOPIFY_SHOP_DOMAIN=mystore.myshopify.com  # ❌
   ```

3. **Update Environment Variables**
   ```bash
   vercel env add SHOPIFY_ACCESS_TOKEN production
   vercel env add SHOPIFY_SHOP_DOMAIN production
   ```

### 3. Timeout Errors

**Symptoms:**
- Requests timing out after 2 seconds
- "AbortError" in logs
- Intermittent 504 errors

**Diagnosis:**
```bash
# Check Shopify API response time
time curl -H "X-Shopify-Access-Token: YOUR_TOKEN" \
          "https://YOUR_SHOP.myshopify.com/admin/api/2023-10/orders.json?limit=1"

# Monitor function execution time
vercel logs --follow | grep "duration"
```

**Resolution Steps:**

1. **Check Shopify API Status**
   - Visit [Shopify Status Page](https://status.shopify.com)
   - Test API directly from different location

2. **Adjust Timeout Settings**
   ```bash
   # Increase timeout temporarily
   vercel env add SHOPIFY_TIMEOUT 5000 production
   ```

3. **Reduce Request Size**
   ```bash
   # Test with smaller limit
   curl "https://your-domain.vercel.app/api/schedule.ics?limit=5"
   ```

### 4. ICS Calendar Generation Issues

**Symptoms:**
- Invalid ICS format
- Calendar events not displaying correctly
- Special characters causing issues

**Diagnosis:**
```bash
# Download and validate ICS format
curl "https://your-domain.vercel.app/api/schedule.ics?limit=1" > test.ics

# Check for proper ICS structure
head -5 test.ics
# Should start with:
# BEGIN:VCALENDAR
# VERSION:2.0
# PRODID:-//HOTMESS//Shopify Schedule//EN

# Validate ICS format online or with tools
```

**Resolution Steps:**

1. **Check Character Encoding**
   ```bash
   # Ensure UTF-8 encoding
   file test.ics
   
   # Check for problematic characters
   grep -P '[^\x00-\x7F]' test.ics
   ```

2. **Validate Date Formats**
   - Ensure dates are in YYYYMMDDTHHMMSSZ format
   - Check timezone handling

3. **Test with Minimal Data**
   ```bash
   # Test with single order
   curl "https://your-domain.vercel.app/api/schedule.ics?limit=1"
   ```

### 5. Memory or Performance Issues

**Symptoms:**
- Function timeout (10s+ execution)
- High memory usage warnings
- Slow response times

**Diagnosis:**
```bash
# Check function performance
vercel logs | grep -E "(duration|memory)"

# Test with different order limits
for limit in 10 50 100 200; do
  echo "Testing limit: $limit"
  time curl "https://your-domain.vercel.app/api/schedule.ics?limit=$limit" > /dev/null
done
```

**Resolution Steps:**

1. **Optimize Order Limit**
   ```bash
   # Use reasonable default limits
   # Recommended: 50-100 orders max
   curl "https://your-domain.vercel.app/api/schedule.ics?limit=50"
   ```

2. **Implement Pagination**
   - Modify API to handle large datasets in chunks
   - Add caching for frequently requested data

3. **Monitor Resource Usage**
   ```bash
   # Check Vercel function metrics
   vercel logs --follow | grep -E "(duration|memory|timeout)"
   ```

### 6. Rate Limiting Issues

**Symptoms:**
- 429 Too Many Requests responses
- "Rate limit exceeded" errors
- Intermittent failures during high usage

**Diagnosis:**
```bash
# Check for rate limit headers
curl -I "https://your-domain.vercel.app/api/schedule.ics"

# Monitor for 429 responses
vercel logs | grep "429"
```

**Resolution Steps:**

1. **Implement Request Throttling**
   - Add delays between API calls
   - Implement exponential backoff

2. **Check Shopify API Limits**
   - Standard: 40 requests/second
   - Plus: 80 requests/second
   - Monitor current usage

3. **Optimize API Usage**
   - Batch requests where possible
   - Cache responses for short periods
   - Use GraphQL for efficient queries

## Monitoring and Alerting

### Key Metrics to Watch

1. **Response Time**
   ```bash
   # Normal: < 2 seconds
   # Warning: 2-5 seconds
   # Critical: > 5 seconds
   ```

2. **Error Rate**
   ```bash
   # Normal: < 1%
   # Warning: 1-5%
   # Critical: > 5%
   ```

3. **Success Rate**
   ```bash
   # Normal: > 99%
   # Warning: 95-99%
   # Critical: < 95%
   ```

### Log Analysis

**Common Log Patterns:**
```bash
# Successful requests
grep "200" vercel-logs.txt

# Error patterns
grep -E "(Error|Exception|Failed)" vercel-logs.txt

# Timeout patterns
grep -E "(timeout|abort)" vercel-logs.txt

# Rate limiting
grep "429" vercel-logs.txt
```

## Prevention Strategies

### 1. Proactive Monitoring

- Set up alerts for error rates > 5%
- Monitor response times continuously
- Track Shopify API rate limit usage

### 2. Regular Maintenance

- Update dependencies monthly
- Rotate API credentials quarterly
- Review and optimize code performance

### 3. Testing Procedures

```bash
# Integration test
npm run test:integration

# Load testing
npm run test:load

# Smoke test after deployment
curl -f "https://your-domain.vercel.app/api/schedule.ics?limit=1"
```

## Escalation Procedures

### Level 1: Self-Service
- Follow this runbook
- Check basic connectivity and configuration
- Review recent changes

### Level 2: Development Team
- Complex configuration issues
- Code-related problems
- Performance optimization

### Level 3: External Support
- Platform-specific issues (Vercel)
- Third-party API problems (Shopify)
- Infrastructure concerns

## Additional Resources

### Documentation
- [Shopify API Documentation](https://shopify.dev/api)
- [Vercel Functions Documentation](https://vercel.com/docs/functions)
- [ICS Format Specification](https://tools.ietf.org/html/rfc5545)

### Tools
- [Shopify API Explorer](https://shopify.dev/tools/api-explorer)
- [ICS Validator](https://icalendar.org/validator.html)
- [Vercel CLI](https://vercel.com/docs/cli)

### Support Channels
- GitHub Issues: [Repository Issues](https://github.com/SICQR/hotmess-vercel-starter-plu/issues)
- Vercel Support: [Vercel Help](https://vercel.com/help)
- Shopify Partners: [Partner Support](https://partners.shopify.com/support)