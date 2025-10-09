<template>

<body>
  <h1 class="main-title">喜报</h1>
  <p class="content">我想...</p>

  <h1 class="main-title">祝你生日快乐</h1>
  <p class="content">以下是</p>

  <h1 class="main-title">你的生日礼物</h1>

  <p class="content">
    <button class="btn" onclick="showGift()">点击查看礼物</button>
  </p>


</body>
</template>

<script>
function showGift() {
  var gift = document.getElementById("gift");
  gift.style.display = "block";
  console.log("你收到了我的礼物")
}
</script>

<style>
body {
    background-color: #f9f9f9;
    color: #333;
    line-height: 1.6;
    margin: 20px;
    font-family: Arial, sans-serif;
  }

  .main-title {
    color: #A80D0C;
    text-align: center;
  }

  .content {
    font-size: 16px;
    background: #fff;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    max-width: 600px;
    margin: 20px auto;
    text-align: ce nter;
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
