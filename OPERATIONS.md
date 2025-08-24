# HOTMESS Operations Guide

This document provides operational procedures and monitoring guidelines for the HOTMESS Vercel project.

## Monitoring and Alerting

### Key Metrics to Monitor

1. **API Response Times**
   - Shopify API calls should complete within 2 seconds
   - ICS generation should complete within 5 seconds
   - Monitor for timeout errors

2. **Error Rates**
   - Shopify authentication errors (401/403)
   - Network timeouts and connection failures
   - ICS generation failures

3. **Resource Usage**
   - Vercel function execution time
   - Memory usage during large order processing
   - API rate limiting from Shopify

### Monitoring Setup

#### Vercel Analytics
- Enable Vercel Analytics for automatic monitoring
- Set up alerts for 4xx/5xx error rates > 5%
- Monitor function execution times

#### Custom Logging
```javascript
// Add to your API endpoints for structured logging
console.log(JSON.stringify({
  timestamp: new Date().toISOString(),
  level: 'info',
  service: 'hotmess-api',
  endpoint: '/api/schedule.ics',
  duration: responseTime,
  status: response.status
}));
```

## Deployment Procedures

### Production Deployment

1. **Pre-deployment Checklist**
   - [ ] All tests passing
   - [ ] Environment variables configured
   - [ ] Shopify API credentials valid
   - [ ] Node.js version matches .node-version (20)

2. **Deployment Steps**
   ```bash
   # 1. Build locally to verify
   npm run build
   
   # 2. Deploy to Vercel
   vercel --prod
   
   # 3. Verify deployment
   curl https://your-domain.vercel.app/api/schedule.ics
   ```

3. **Post-deployment Verification**
   - [ ] API endpoints responding correctly
   - [ ] ICS calendar downloads properly
   - [ ] Shopify integration working
   - [ ] No error logs in Vercel dashboard

### Rollback Procedures

If issues are detected after deployment:

1. **Immediate Rollback**
   ```bash
   # Rollback to previous deployment
   vercel rollback
   ```

2. **Investigation**
   - Check Vercel function logs
   - Verify Shopify API status
   - Test ICS generation with limited orders

## Environment Management

### Environment Variables

| Variable | Purpose | Required | Default |
|----------|---------|----------|---------|
| `SHOPIFY_SHOP_DOMAIN` | Your Shopify store domain | Yes | - |
| `SHOPIFY_ACCESS_TOKEN` | Shopify API access token | Yes | - |
| `SHOPIFY_API_VERSION` | Shopify API version | No | 2023-10 |
| `SHOPIFY_TIMEOUT` | Request timeout (ms) | No | 2000 |
| `SHOPIFY_RETRIES` | Number of retries | No | 1 |

### Configuration Management

1. **Development Environment**
   - Use `.env.local` for local development
   - Never commit `.env.local` to version control

2. **Production Environment**
   - Set environment variables in Vercel dashboard
   - Use Vercel CLI for bulk updates:
   ```bash
   vercel env add SHOPIFY_SHOP_DOMAIN production
   ```

## Performance Optimization

### Shopify API Optimization

1. **Request Batching**
   - Batch multiple API calls when possible
   - Use GraphQL for complex queries (future enhancement)

2. **Caching Strategy**
   - Implement Redis caching for frequently accessed data
   - Cache ICS calendars for 5-10 minutes

3. **Rate Limiting**
   - Respect Shopify API rate limits (40 requests/second)
   - Implement exponential backoff for 429 responses

### ICS Generation Optimization

1. **Memory Management**
   - Process orders in batches for large datasets
   - Stream ICS content for very large calendars

2. **Response Optimization**
   - Enable gzip compression
   - Set appropriate cache headers

## Security Considerations

### API Security

1. **Access Token Management**
   - Rotate Shopify access tokens regularly
   - Use minimum required permissions
   - Monitor for unauthorized access

2. **Request Validation**
   - Validate all query parameters
   - Implement rate limiting on public endpoints
   - Sanitize all user inputs

### Data Privacy

1. **Customer Data**
   - Only include necessary customer information in calendars
   - Implement data retention policies
   - Ensure GDPR compliance if applicable

## Backup and Recovery

### Data Backup

1. **Configuration Backup**
   - Export environment variables monthly
   - Document all custom configurations

2. **Code Backup**
   - Repository is automatically backed up in GitHub
   - Tag releases for easy rollback

### Recovery Procedures

1. **Service Recovery**
   ```bash
   # 1. Check service status
   curl -I https://your-domain.vercel.app/api/schedule.ics
   
   # 2. Check Vercel function logs
   vercel logs
   
   # 3. Redeploy if necessary
   vercel --prod
   ```

2. **Data Recovery**
   - Shopify data is managed by Shopify (no backup needed)
   - Generated calendars are ephemeral (regenerated on request)

## Maintenance Schedules

### Regular Maintenance

- **Weekly**: Review error logs and performance metrics
- **Monthly**: Update dependencies and security patches
- **Quarterly**: Review and rotate API credentials
- **Annually**: Review and update API versions

### Maintenance Windows

- **Preferred**: Weekends, 2-4 AM UTC
- **Duration**: Typically 15-30 minutes
- **Notification**: Announce maintenance via appropriate channels

## Contact Information

### Escalation Path

1. **Level 1**: Development team
2. **Level 2**: DevOps/Platform team
3. **Level 3**: External vendors (Vercel, Shopify)

### Emergency Contacts

- **On-call Developer**: [Contact information]
- **DevOps Lead**: [Contact information]
- **Project Manager**: [Contact information]

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Shopify API Documentation](https://shopify.dev/api)
- [Next.js Documentation](https://nextjs.org/docs)
- [RUNBOOK.md](./RUNBOOK.md) - Troubleshooting guide