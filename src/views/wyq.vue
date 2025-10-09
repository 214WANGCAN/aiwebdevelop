<html>

<head>
    <meta charset="uft-8">
    <title>唐宇NB</title>
    <style>
        body{
            background-color: white;
            color: red;
            line-height: 1.6;
            margin: 20px;
        }   
        .main-one{
             background-color: white;
            color: black;
            line-height: 1.6;
            margin: 20px;
        }
        .gift-img {
            max-width: 100%;
            border-radius: 10px; 
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
            display: none; /* 初始状态不显示 */
        }
    </style>
</head>

<body>
    <h1> 
        🎂喜报🎂
    </h1>
    <p class="main-one">
        我想...
    </p>

    <script>
        function showGift(){
             var gift = document.getElementById("gift");
             gift.style.display = "block";
            console.log("你收到了礼物");
}

        



    </script>

    <h2>
        🎂祝你生日快乐🎂
    </h2>
    <p class="main-one">
        祝你生日快乐     祝你生日快乐          祝你生日快乐     祝你生日快乐
        happy birthday to you
        happy birthday to you     happy birthday happy birthday     happy birthday to you
        happy birthday to you     happy birthday to you     happy birthday happy birthday
        happy birthday to you     祝你生日快乐     祝你生日快乐
    </p>
    <h3>
        你的生日礼物
    </h3>
    <p>
    <img id="gift" src="18092672de2800b6d3370e05af755b0f.png" alt="主页横幅图片"width="1000" height="600" style = "display: none">
    <button class="main-one" onclick="showGift()">点击看看看看看看看礼物</button>
    </p>
</body>


</html>