
<template>

<head>
    <meta charset = "utf-8">
    <title>张浩扬的生日</title>

</head>

<body>
    <h1 class="main-title">喜报</h1>
    <p class="content">我想...</p>
    <h1 class="main-title">祝你生日快乐</h1>
    <p class="content">以下是</p>
    <h1 class="main-title">你的生日礼物</h1>
    <p>
        <img id = "gift" src="/public/截屏.png" class="dis-img" style="margin: 0 auto">
        <button class="btn" onclick="showGift()", style="display: block; margin: 0 auto"></button>
    </p>
</body>

</template>


<style>
        /* body{
            background-color:rgba(62, 125, 125, 0.507);
            color:rgb(66, 187, 118);
            line-height:1.6;
            margin:20px;
        } */
        .main-title {
            color: #b22214;
            text-align: center;
            /* border-bottom: 2px solid #59ab65;
            padding-bottom: 10px; */
        }

        .content {
            font-size: 16px;
            background: #fff;
            padding: 10px;
            border-radius: 10px;
            text-align: center;
            box-shadow: 0 4px 5px rgb(125, 125, 125);
            max-width: 600px;
            margin: 20px auto;
        }

        .spinning-image {
            animation: rotate 3s linear infinite;
        }
        @keyframes rotate {
            from { transform: rotate(0deg); }     /* 起始角度 */
            to { transform: rotate(360deg); }      /* 结束角度（一圈）*/
        }

        * {
            animation: shake 3s ease-in-out infinite; /* 每3秒完成一次循环，缓动函数使动作更自然 */
        }

        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-50px); }
            50% { transform: translateX(0); }  
            75% { transform: translateX(50px); } 
        }
        .dis-img{
            display: none;
        }
        .btn{
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

    <script>
        function showGift(){
            var gift = document.getElementById("gift");
            gift.style.display = "block";
            console.log("你收到了我的礼物")
        }
    </script>
