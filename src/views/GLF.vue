<script setup>
    function showGift(){
        var gift = document.getElementById("gift");
        gift.style.display = "block";
        concole.log("你收到了我的礼物");
    }
</script>
<template>
    <body>
        <h1 class="main-title">喜报</h1>
        <p class="content">我想...</p>
        <h1 class="main-title">祝你生日快乐</h1>
        <p class="content">以下是</p>
        <h1 class="main-title">你的生日礼物</h1>

        <!-- <p>
            <img id="gift" src="C:\Users\MECHREVO\Desktop\1.jpg">
            <button class="btn" onclick="showGift()",style="display:block;margin:0 auto">点击查看礼物</button>
        </p> -->
    </body>
</template>

<style>
    body {
        background-color: rgb(255, 255, 255);
        color: black;
        line-height: 1.6;
        margin: 50px;
    }
    .main-title {
        color: #ff0000;
        text-align: center;
        /* border-bottom: 2px solid #6fefa9; */
        padding-bottom: 10px;
    }
    .content {
        font-size: 16px;
        background: #ffffff;
        text-align: center;
        padding: 10px;
        border-radius: 100px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); 
        max-width: 1200px;
        margin: 50px auto;  

    }
    img {
            max-width: 50%;
            height: auto;
            display: block;
            margin: 10px 0;
            width: 300px;
            display:none;
            margin:0 auto;
    }
</style>