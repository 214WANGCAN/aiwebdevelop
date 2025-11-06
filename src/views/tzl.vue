


<template>
<head>
    <meta charset="utf-8">
    <title>火山教程</title>
    
</head>
</template>
<style>
    body {
      background-color: #f9f9f9;
      color: #333;
      line-height: 1.6;
      margin: 20px;
    }
  
    .main-title {
      color: #b30505;
      text-align: center;
      border-bottom: 2px solid #2a0762;
      padding-bottom: 10px;
    }
  
    .content {
      font-size: 16px;
      background: #fff;
      padding: 10px;
      border-radius: 5px;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
      max-width: 600px;
      margin: 20px auto;
      text-align: center;
    }
    .image {
        text-align: center;
        
    }
    .gift-img {
    max-width: 100%;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    display: none; /* 初始状态不显示 */
   }

   /* 按钮样式 */
   .btn {
    background-color: #A80D0C;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
    margin-top: 15px;
   }

    


</style>
<template>
<body>
    <h1 class="main-title">喜报</h1>
    <p class="content">我想</p>
    <h2 class="main-title">祝你生日快乐</h2>
    <p class="content">以下是</p>
    <h3 class="main-title">你的生日礼物</h3>
    <p class="content">
        <img  id="gift" src="D:\Tommy\Pictures\微信图片_20240916213540.jpg" class = "gift-img">
        <button class="btn"   onclick = "showGift()">点击查看礼物</button>        
    </p>
    <!-- <p class = "image"><img src="D:\Tommy\Pictures\微信图片_20240916213540.jpg" alt="显示失败" width="700"></p> -->
</body>
</template>

<script>
        function showGift(){
            var gift = document.getElementById("gift");
            gift.style.display = "block";
            console.log("你收到了我的礼物")
        }
</script>

