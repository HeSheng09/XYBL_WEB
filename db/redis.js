const redis = require('redis');
const redisClient = redis.createClient(6379, 'r-bp1c5162183d5aa4pd.redis.rds.aliyuncs.com',{auth_pass: 'xybl:xybl1234_'});

redisClient.on('error', err => {
    console.log(err);
})

module.exports = redisClient;