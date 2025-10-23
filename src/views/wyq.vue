<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>唐宇NB</title>
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
    <style>
        body {
            background-color: white;
            color: red;
            line-height: 1.6;
            margin: 20px;
        }   
        .main-one {
            background-color: white;
            color: black;
            line-height: 1.6;
            margin: 20px;
        }
        .gift-img {
            max-width: 100%;
            border-radius: 10px; 
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        }
    </style>
</head>
<body>
    <div id="app">
        <h1>🎂喜报🎂</h1>
        
        <p class="main-one">
            我想...
        </p>

        <h2>🎂祝你生日快乐🎂</h2>
        
        <p class="main-one">
            祝你生日快乐     祝你生日快乐          祝你生日快乐     祝你生日快乐
            happy birthday to you
            happy birthday to you     happy birthday happy birthday     happy birthday to you
            happy birthday to you     happy birthday to you     happy birthday happy birthday
            happy birthday to you     祝你生日快乐     祝你生日快乐
        </p>
        
        <h3>你的生日礼物</h3>
        
        <p>
            <img 
                v-show="showGift" 
                :src="giftImage" 
                alt="主页横幅图片" 
                width="1000" 
                height="600" 
                class="gift-img"
            >
            <button class="main-one" @click="showGift = !showGift">
                {{ showGift ? '隐藏礼物' : '点击看看看看看看看礼物' }}
            </button>
        </p>
    </div>

    <script>
        const { createApp, ref } = Vue;
        
        createApp({
            setup() {
                const showGift = ref(false);
                const giftImage = ref('18092672de2800b6d337e05af755b0f.png');
                
                return {
                    showGift,
                    giftImage
                };
            }
        }).mount('#app');
    </script>
</body>
</html>