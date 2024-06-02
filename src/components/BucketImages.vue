<template>
    <div id="images-container">
        <img v-for="(image, index) in images" :src="image" :key="index" :alt="'Image ' + (index + 1)" />
    </div>
</template>

<script>
import AWS from 'aws-sdk';

export default {
    name: 'BucketImagesComponent',
    data() {
        return {
            images: []
        };
    },
    async created() {
        this.listImages();
    },
    methods: {
        listImages() {
            const BUCKET_NAME = 'imagenestfgmarcos';
            const REGION = 'us-east-1';
            const ACCESS_KEY_ID = 'ASIA6GBMAS65ADZKCPZL';
            const SECRET_ACCESS_KEY = 'vddNg/wJ3T6O+DPhkbkcF5Hx1o4U/lYLpEV4zbZm';
            const SESSION_TOKEN = 'IQoJb3JpZ2luX2VjEO7//////////wEaCXVzLXdlc3QtMiJGMEQCIEdIHbomNv9q75gI8xE+762FPGAFb3shJUsFbPlEvSz6AiBhYGyz2mG9t4rzjpcfZlMQSJIugILSAtLb/fa5UrHHcCqoAgh3EAAaDDk3NTA0OTg4OTcyMiIMJN5UK/wLm4z0KtYPKoUCGNmGkXogYQA382KSVeKWoj5tHddvcSPpr5XwFdiWpfviracJc/fnwu5u1AQzA3VnqdCjwsA/2ePAw7iuM5ksHuBFNpyf6+ePM2vWh/2belKhzM8WH6Q6nWFdzd4ZeZWudc3t8c89ooRuTjgaJDK/YoZkf6ZXbcLaHRDZbmZnM4arCutp1ARi4rIqXkZAGgB7hQVwUI+ax9tCf3wY76ATbV2uJaK53h87wBeqOWSwlqvAL8ouJEfdHqCNI3kJtPr7sWE4WL9LOv4Kicz/f1z11r+zt1hohipbIQbHLPkD/0r+y1ClOf1UYFK51bx3zcPHv5AhiuMOc/5qcPtxqPh4H8K9FN5lMJL18bIGOp4BLRwrCUgH81RRHAx8BLdoWW2P0WMWJs0YIqedMkKNVQAEaL+10wPKIa0wdkhbiNxzY/TbrW8Q8unk3mTuzUaEpFGDEB7BxfvbnO4Enb/7fdBCfd9zHB52Z+khfJ0Wl8i1ellC7N5XL9Ujjx/nNE/mCmezDqKQfYOBan9ffdl/p8aBoDCOHDGyLfikCO/xK2HVQtGloPoIf2jlxg+dzAo=';

            const s3 = new AWS.S3({
                accessKeyId: ACCESS_KEY_ID,
                secretAccessKey: SECRET_ACCESS_KEY,
                sessionToken: SESSION_TOKEN,
                region: REGION,
            });

            const params = {
                Bucket: BUCKET_NAME,
                MaxKeys: 20,
            };

            s3.listObjectsV2(params, (err, data) => {
                if (err) {
                    console.error('Error fetching images:', err);
                } else {
                    this.images = data.Contents.map(item => `https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com/${item.Key}`);
                }
            });
        },
    },
};
</script>

<style scoped>
#images-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

#images-container img {
    width: 100px;
    margin: 10px;
}
</style>
