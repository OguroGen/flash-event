jQuery(function ($) {
    
    var myMondai, myCnt, myKotae, Keta, Kuchi, Interval, difficulty;
    var objMondaiStyle = new Object;
    var objReadyStyle = new Object;
    var objCorrectStyle = new Object;
    var objMissStyle = new Object;
    
    myMondai = new Array(30);
    //初期値は１０級
    Keta = 2;
    Kuchi = 2;
    Interval = 2000;
    difficulty = 4;
    
    //問題の表示スタイル
    objMondaiStyle.color = "#E0FFFF";
    objMondaiStyle.fontSize = "100pt";
    objMondaiStyle.fontFamily = 'Sawarabi Gothic';
    objMondaiStyle.paddingTop = "30px";
    //ReadyStartの表示スタイル
    objReadyStyle.color = "#FFE4E1";
    objReadyStyle.fontSize = "20pt";
    objReadyStyle.fontFamily = 'Righteous';
    objReadyStyle.paddingTop = "40px";
    //ご明算の表示スタイル
    objCorrectStyle.color = "lightgoldenrodyellow";
    objCorrectStyle.fontSize = "60pt";
    objCorrectStyle.fontFamily = 'Kosugi Maru';
    objCorrectStyle.paddingTop = "10px";
    //残念の表示スタイル
    objMissStyle.color = "lightblue";
    objMissStyle.fontSize = "30pt";
    objMissStyle.fontFamily = 'Sawarabi Gothic';
    objMissStyle.paddingTop = "20px";
    
    function Ready() {
        
        $("#mondai").css(objReadyStyle).text("READY").show().animate({fontSize: "60pt"}, 800, function () {
            
            $("#mondai").text("");
            
            setTimeout(function () {
                $("#mondai").css("fontSize", "70pt").text("START");
                setTimeout(function () {
                    $("#mondai").text("").css(objMondaiStyle);
                    setTimeout(function () {mondaiHyoji(); }, 700);
                }, 700);
            }, 700);
        });
    }
    
    function mondaiHyoji() {
        if (myCnt !== Kuchi) {
            $("#mondai").css("color", "#E0FFFF").text(myMondai[myCnt]);
            myCnt++;
            setTimeout(function () {HyojiKankaku(); }, Interval * 0.7);
        } else {
            $("#AnsInput").fadeIn();
            $("#kotaeText").select();
        }
    }

    function HyojiKankaku() {
        $("#mondai").css("color", "#191970");
        setTimeout(function () {mondaiHyoji(); }, Interval * 0.3);
    }
    
    function AnswerCheck() {

        var inputAns = $("#kotaeText").val();

        if ($.isNumeric(inputAns)) {
            inputAns = Number(inputAns);
            $("#AnsInput").hide();
            $("#StartButton").prop("disabled",false);
            
            if (inputAns === myKotae) {
                $("#mondai").css(objCorrectStyle).html("ご明算<br>Correct.").show();
            } else {
                $("#mondai").css(objMissStyle).html("残念<br>正解は" + myKotae + "だよ<br>The answer is " + myKotae + ".").show();
            }
        } else {
            $("#kotaeText").val("");
        }
    }
    
    //数字の重複をチェックする
    function DuplicatedCheck(str) {
        var checkString = str + "";
        var StringLength = checkString.length;
        var result = false;
        
        for(var i = 0; i < StringLength - 1; i++) {
            for(var j = i + 1; j < StringLength; j++) {
                if(checkString.substr(i,1) === checkString.substr(j,1)){result = true;}
            }
        }
        
        return result;
    }

    //問題を作成する
    function Sakumon() {
        var i, j, tmpR, check, a ,b;
        var preNum = [];
        var nowNum = [];
        var sumNum = [];
        
        switch (difficulty) {
        case 1: //１桁の繰り上がり下がりない問題（五玉無し、２０級）
            for (i = 0; i < Kuchi; i++) {               
                do {
                    check = false;
                    switch (myKotae) {
                    case 0:
                        tmpR = Math.floor(Math.random() * 4 + 1);
                        if(tmpR == 1) {myMondai[i] = 1}
                        if(tmpR == 2) {myMondai[i] = 2}
                        if(tmpR == 3) {myMondai[i] = 3}
                        if(tmpR == 4) {myMondai[i] = 4}
                        break;
                    case 1:
                        tmpR = Math.floor( Math.random()  * 4 + 1);
                        if(tmpR == 1) {myMondai[i] = -1}
                        if(tmpR == 2) {myMondai[i] = 1}
                        if(tmpR == 3) {myMondai[i] = 2}
                        if(tmpR == 4) {myMondai[i] = 3}
                        break;
                    case 2:
                        tmpR = Math.floor( Math.random()  * 4 + 1);
                        if(tmpR == 1) {myMondai[i] = -2}
                        if(tmpR == 2) {myMondai[i] = -1}
                        if(tmpR == 3) {myMondai[i] = 1}
                        if(tmpR == 4) {myMondai[i] = 2}
                        break;
                    case 3:
                        tmpR = Math.floor( Math.random()  * 4 + 1);
                        if(tmpR == 1) {myMondai[i] = -3}
                        if(tmpR == 2) {myMondai[i] = -2}
                        if(tmpR == 3) {myMondai[i] = -1}
                        if(tmpR == 4) {myMondai[i] = 1}
                        break;
                    case 4:
                        tmpR = Math.floor( Math.random()  * 4 + 1);
                        if(tmpR == 1) {myMondai[i] = -4}
                        if(tmpR == 2) {myMondai[i] = -3}
                        if(tmpR == 3) {myMondai[i] = -2}
                        if(tmpR == 4) {myMondai[i] = -1}
                        break;
                    }
                    
                    if(myMondai[i] == myMondai[i-1]) {check = true}
                    
                } while(check);
                
                myKotae += myMondai[i];
                
            }
            break;
                
        case 2: //１桁の繰り上がり下がりない問題（１９〜１３級）
            for (i = 0; i < Kuchi ; i++) {
                do{
                    check = false;                   
                    switch(myKotae) {
                    case 0:
                        tmpR = Math.floor( Math.random() * 7 +1);
                        if(tmpR == 1) {myMondai[i] = 1}
                        if(tmpR == 2) {myMondai[i] = 2}
                        if(tmpR == 3) {myMondai[i] = 3}
                        if(tmpR == 4) {myMondai[i] = 5}
                        if(tmpR == 5) {myMondai[i] = 6}
                        if(tmpR == 6) {myMondai[i] = 7}
                        if(tmpR == 7) {myMondai[i] = 8}
                        break;
                    case 1:
                        tmpR = Math.floor( Math.random()  * 8 + 1);
                        if(tmpR == 1) {myMondai[i] = -1}
                        if(tmpR == 2) {myMondai[i] = 1}
                        if(tmpR == 3) {myMondai[i] = 2}
                        if(tmpR == 4) {myMondai[i] = 3}
                        if(tmpR == 5) {myMondai[i] = 5}
                        if(tmpR == 6) {myMondai[i] = 6}
                        if(tmpR == 7) {myMondai[i] = 7}
                        if(tmpR == 8) {myMondai[i] = 8}
                        break;
                    case 2:
                        tmpR = Math.floor( Math.random()  * 7 + 1);
                        if(tmpR == 1) {myMondai[i] = -2}
                        if(tmpR == 2) {myMondai[i] = -1}
                        if(tmpR == 3) {myMondai[i] = 1}
                        if(tmpR == 4) {myMondai[i] = 2}
                        if(tmpR == 5) {myMondai[i] = 5}
                        if(tmpR == 6) {myMondai[i] = 6}
                        if(tmpR == 7) {myMondai[i] = 7}
                        break;
                    case 3:
                        tmpR = Math.floor( Math.random()  * 6 + 1);
                        if(tmpR == 1) {myMondai[i] = -3}
                        if(tmpR == 2) {myMondai[i] = -2}
                        if(tmpR == 3) {myMondai[i] = -1}
                        if(tmpR == 4) {myMondai[i] = 1}
                        if(tmpR == 5) {myMondai[i] = 5}
                        if(tmpR == 6) {myMondai[i] = 6}
                        break;
                    case 4:
                        tmpR = Math.floor( Math.random()  * 4 + 1);
                        if(tmpR == 1) {myMondai[i] = -3}
                        if(tmpR == 2) {myMondai[i] = -2}
                        if(tmpR == 3) {myMondai[i] = -1}
                        if(tmpR == 4) {myMondai[i] = 5}
                        break;
                    case 5:
                        tmpR = Math.floor( Math.random()  * 4 + 1);
                        if(tmpR == 1) {myMondai[i] = -5}
                        if(tmpR == 2) {myMondai[i] = 1}
                        if(tmpR == 3) {myMondai[i] = 2}
                        if(tmpR == 4) {myMondai[i] = 3}
                        break;
                    case 6:
                        tmpR = Math.floor( Math.random()  * 6 + 1);
                        if(tmpR == 1) {myMondai[i] = -6}
                        if(tmpR == 2) {myMondai[i] = -5}
                        if(tmpR == 3) {myMondai[i] = -1}
                        if(tmpR == 4) {myMondai[i] = 1}
                        if(tmpR == 5) {myMondai[i] = 2}
                        if(tmpR == 6) {myMondai[i] = 3}
                        break;
                        case 7:
                        tmpR = Math.floor( Math.random()  * 7 + 1);
                        if(tmpR == 1) {myMondai[i] = -7}
                        if(tmpR == 2) {myMondai[i] = -6}
                        if(tmpR == 3) {myMondai[i] = -5}
                        if(tmpR == 4) {myMondai[i] = -2}
                        if(tmpR == 5) {myMondai[i] = -1}
                        if(tmpR == 6) {myMondai[i] = 1}
                        if(tmpR == 7) {myMondai[i] = 2}
                        break;
                    case 8:
                        tmpR = Math.floor( Math.random()  * 8 + 1);
                        if(tmpR == 1) {myMondai[i] = -8}
                        if(tmpR == 2) {myMondai[i] = -7}
                        if(tmpR == 3) {myMondai[i] = -6}
                        if(tmpR == 4) {myMondai[i] = -5}
                        if(tmpR == 5) {myMondai[i] = -3}
                        if(tmpR == 6) {myMondai[i] = -2}
                        if(tmpR == 7) {myMondai[i] = -1}
                        if(tmpR == 8) {myMondai[i] = 1}
                        break;
                    case 9:
                        tmpR = Math.floor( Math.random()  * 7 + 1);
                        if(tmpR == 1) {myMondai[i] = -8}
                        if(tmpR == 2) {myMondai[i] = -7}
                        if(tmpR == 3) {myMondai[i] = -6}
                        if(tmpR == 4) {myMondai[i] = -5}
                        if(tmpR == 5) {myMondai[i] = -3}
                        if(tmpR == 6) {myMondai[i] = -2}
                        if(tmpR == 7) {myMondai[i] = -1}
                        break;
                    }
                    
                    if(myMondai[i] == myMondai[i-1]) {check = true}
                    
                } while(check);
                
                myKotae += myMondai[i];
                
            }
            break;
                
        case 3: //２桁の繰り上がり下がりない問題（１１〜１２級）
            var tmpLowerSum = Math.floor(Math.random() * 3) + 1;
            var tmpUpperSum = Math.floor(Math.random() * 2) * 5;
            var tmpLowerVal = 0;
            var tmpUpperVal = 0;
            var Fugou= new Array(30);
            
            //一口目を決定
            myMondai[0] = (tmpLowerSum + tmpUpperSum) * 10;

            //十の位を先に決める
            for(i=1 ; i < Kuchi; i++){
                
                do {
                    check = false;

                    if(tmpLowerSum * 0.25 > Math.random()){
                    //引き算の場合
                        Fugou[i] = -1;
                        //一玉の値決定
                        tmpLowerVal = -1 * (Math.floor(Math.random() * tmpLowerSum) + 1); 
                        //五玉の値決定
                        if((tmpUpperSum - (Math.random() * 8)) > 0){
                            tmpUpperVal = -5;
                        }else{
                            tmpUpperVal = 0;
                        }                    
                    }else{
                    //足し算の場合
                        Fugou[i] = 1;
                        //一玉の値決定
                        tmpLowerVal = Math.floor(Math.random() * (4-tmpLowerSum)) + 1;
                        //五玉の値決定
                        if((tmpUpperSum + (Math.random() * 8)) < 5){
                            tmpUpperVal = 5;
                        }else{
                            tmpUpperVal = 0;
                        }
                    } 
                    
                    //十の位の合計が０になっていないかチェック
                    var checkUpper = tmpUpperSum + tmpUpperVal;
                    var checkLower = tmpLowerSum + tmpLowerVal;
                    if (checkUpper == 0 && checkLower == 0){check = true}
                   
                } while(check);

                myMondai[i] = (tmpLowerVal + tmpUpperVal) * 10;
                
                tmpLowerSum += tmpLowerVal;
                tmpUpperSum += tmpUpperVal;
            }   

            //一の位の値を決めていく
            tmpLowerSum = Math.floor(Math.random() * 3) + 1;
            tmpUpperSum = Math.floor(Math.random() * 2) * 5;

            myMondai[0] += tmpLowerSum + tmpUpperSum;

            for(j=1 ; j<Kuchi ; j++){
                do {
                    check = false;
                    
                    if(Fugou[j] == -1){
                    //引き算の場合 
                        //一玉の値を決める
                        if(tmpLowerSum == 0){
                            tmpLowerVal = 0;
                        }else{
                            tmpLowerVal = -1 * (Math.floor(Math.random() * tmpLowerSum + 1)); 
                        }
                        //五玉の値を決める
                        if(tmpUpperSum == 0){
                            tmpUpperVal = 0;
                        }else{
                            tmpUpperVal = -1 * (Math.floor(Math.random() * 2) * 5); 
                        }
                    }else{
                    //足し算の場合
                        //一玉の値を決める
                        if(tmpLowerSum == 4){
                            tmpLowerVal = 0;
                        }else{
                            tmpLowerVal = Math.floor(Math.random() * (4-tmpLowerSum)) + 1;
                        }
                        //五玉の値を決める
                        if(tmpUpperSum == 5){
                            tmpUpperVal = 0;
                        }else{
                            tmpUpperVal = Math.floor(Math.random() * 2) * 5; 
                        }
                    }
                    
                    var checkMondai = myMondai[j] + tmpLowerVal + tmpUpperVal;
                    
                    if (Math.abs(myMondai[j-1]) === Math.abs(checkMondai)) {check = true}   //同じ数の問題が続かないかチェック
                    
                } while(check);

                myMondai[j] += tmpLowerVal + tmpUpperVal;

                tmpLowerSum += tmpLowerVal;
                tmpUpperSum += tmpUpperVal;
            }

            for(var l=0 ; l<Kuchi ; l++) {
                myKotae += myMondai[l];
            }
            break;
                
       case 4: //５＋８などの複合問題無し、大きなくり上がりも無し、足し算ばっかり（１０〜４級）

            for (i = 0; i < Kuchi ; i++) {                
                do{
                    
                    myMondai[i] = Math.floor( Math.random() * 9 * Math.pow(10,Keta-1) + Math.pow(10,Keta-1));
                    
                    check = DuplicatedCheck(myMondai[i]);           //重複する文字があるかチェック
                    
                    if(i > 0){
                        for(j=0; j < Keta; j++) {
                            preNum[j] = myMondai[i-1].toString().substr(-1 * (j +1), 1) * 1;
                            nowNum[j] = myMondai[i].toString().substr(-1 * (j +1), 1) * 1;
                            sumNum[j] = myKotae.toString().substr(-1 * (j +1),1) *1;
                            
                            if(preNum[j] == nowNum[j]) {check = true;} //同じ数字が続かないかチェック
                            if(sumNum[j] >= 5 && nowNum[j] >= 6 && sumNum[j] + nowNum[j] <= 14) {check = true;}  //複合問題がないかチェック
                            //大きな繰り上がりがないかチェック
                            if(j > 0) {
                                a = sumNum[j] + nowNum[j];
                                b = sumNum[j-1] + nowNum[j-1];
                                if((a == 4 && b > 9) || (a == 9 && b > 9)) {check = true;}
                            }
                        }
                    }
                    
                } while(check);

                myKotae += myMondai[i];
            }
            break;
                
        case 5: //足し算ばっかり（３級以上）

            for (i = 0; i < Kuchi ; i++) {                
                do{
                    
                    myMondai[i] = Math.floor( Math.random() * 9 * Math.pow(10,Keta-1) + Math.pow(10,Keta-1));
                    
                    check = DuplicatedCheck(myMondai[i]);           //重複する文字があるかチェック
                    
                    if(i > 0){                       
                        for(j=0; j < Keta; j++) {
                            preNum = myMondai[i-1].toString().substr(j, 1);
                            nowNum = myMondai[i].toString().substr(j, 1);
                            if(preNum == nowNum) {check = true;} //同じ数字が続かないかチェック
                        }
                    }
                    
                } while(check);

                myKotae += myMondai[i];
            }
            break;
                
        case 6: //全珠連の７級専用（２桁３口、１の位に２回０が出てくる）
            
            tmpR = Math.floor(Math.random()*3);
                
            for (i = 0; i < Kuchi ; i++) {                
                do{
                    if(i == tmpR){
                        myMondai[i] = Math.floor( Math.random() * 90 + 10);
                    } else {
                        myMondai[i] = Math.floor( Math.random() * 9 + 1 ) * 10;
                    }
                    
                    check = DuplicatedCheck(myMondai[i]);           //重複する文字があるかチェック
                    
                    if(i > 0){
                        if(myMondai[i] == myMondai[i-1]) {check = true;}
                    }
                    
                } while(check);

                myKotae += myMondai[i];
            }
            break;
            
        case 7: //全珠連の１１級専用（２桁繰り上がりなし、１の位は０）
            for (i = 0; i < Kuchi ; i++) {
                do{
                    check = false;                   
                    switch(myKotae) {
                    case 0:
                        tmpR = Math.floor( Math.random() * 7 +1);
                        if(tmpR == 1) {myMondai[i] = 10}
                        if(tmpR == 2) {myMondai[i] = 20}
                        if(tmpR == 3) {myMondai[i] = 30}
                        if(tmpR == 4) {myMondai[i] = 50}
                        if(tmpR == 5) {myMondai[i] = 60}
                        if(tmpR == 6) {myMondai[i] = 70}
                        if(tmpR == 7) {myMondai[i] = 80}
                        break;
                    case 10:
                        tmpR = Math.floor( Math.random()  * 8 + 1);
                        if(tmpR == 1) {myMondai[i] = -10}
                        if(tmpR == 2) {myMondai[i] = 10}
                        if(tmpR == 3) {myMondai[i] = 20}
                        if(tmpR == 4) {myMondai[i] = 30}
                        if(tmpR == 5) {myMondai[i] = 50}
                        if(tmpR == 6) {myMondai[i] = 60}
                        if(tmpR == 7) {myMondai[i] = 70}
                        if(tmpR == 8) {myMondai[i] = 80}
                        break;
                    case 20:
                        tmpR = Math.floor( Math.random()  * 7 + 1);
                        if(tmpR == 1) {myMondai[i] = -20}
                        if(tmpR == 2) {myMondai[i] = -10}
                        if(tmpR == 3) {myMondai[i] = 10}
                        if(tmpR == 4) {myMondai[i] = 20}
                        if(tmpR == 5) {myMondai[i] = 50}
                        if(tmpR == 6) {myMondai[i] = 60}
                        if(tmpR == 7) {myMondai[i] = 70}
                        break;
                    case 30:
                        tmpR = Math.floor( Math.random()  * 6 + 1);
                        if(tmpR == 1) {myMondai[i] = -30}
                        if(tmpR == 2) {myMondai[i] = -20}
                        if(tmpR == 3) {myMondai[i] = -10}
                        if(tmpR == 4) {myMondai[i] = 10}
                        if(tmpR == 5) {myMondai[i] = 50}
                        if(tmpR == 6) {myMondai[i] = 60}
                        break;
                    case 40:
                        tmpR = Math.floor( Math.random()  * 4 + 1);
                        if(tmpR == 1) {myMondai[i] = -30}
                        if(tmpR == 2) {myMondai[i] = -20}
                        if(tmpR == 3) {myMondai[i] = -10}
                        if(tmpR == 4) {myMondai[i] = 50}
                        break;
                    case 50:
                        tmpR = Math.floor( Math.random()  * 4 + 1);
                        if(tmpR == 1) {myMondai[i] = -50}
                        if(tmpR == 2) {myMondai[i] = 10}
                        if(tmpR == 3) {myMondai[i] = 20}
                        if(tmpR == 4) {myMondai[i] = 30}
                        break;
                    case 60:
                        tmpR = Math.floor( Math.random()  * 6 + 1);
                        if(tmpR == 1) {myMondai[i] = -60}
                        if(tmpR == 2) {myMondai[i] = -50}
                        if(tmpR == 3) {myMondai[i] = -10}
                        if(tmpR == 4) {myMondai[i] = 10}
                        if(tmpR == 5) {myMondai[i] = 20}
                        if(tmpR == 6) {myMondai[i] = 30}
                        break;
                    case 70:
                        tmpR = Math.floor( Math.random()  * 7 + 1);
                        if(tmpR == 1) {myMondai[i] = -70}
                        if(tmpR == 2) {myMondai[i] = -60}
                        if(tmpR == 3) {myMondai[i] = -50}
                        if(tmpR == 4) {myMondai[i] = -20}
                        if(tmpR == 5) {myMondai[i] = -10}
                        if(tmpR == 6) {myMondai[i] = 10}
                        if(tmpR == 7) {myMondai[i] = 20}
                        break;
                    case 80:
                        tmpR = Math.floor( Math.random()  * 8 + 1);
                        if(tmpR == 1) {myMondai[i] = -80}
                        if(tmpR == 2) {myMondai[i] = -70}
                        if(tmpR == 3) {myMondai[i] = -60}
                        if(tmpR == 4) {myMondai[i] = -50}
                        if(tmpR == 5) {myMondai[i] = -30}
                        if(tmpR == 6) {myMondai[i] = -20}
                        if(tmpR == 7) {myMondai[i] = -10}
                        if(tmpR == 8) {myMondai[i] = 10}
                        break;
                    case 90:
                        tmpR = Math.floor( Math.random()  * 7 + 1);
                        if(tmpR == 1) {myMondai[i] = -80}
                        if(tmpR == 2) {myMondai[i] = -70}
                        if(tmpR == 3) {myMondai[i] = -60}
                        if(tmpR == 4) {myMondai[i] = -50}
                        if(tmpR == 5) {myMondai[i] = -30}
                        if(tmpR == 6) {myMondai[i] = -20}
                        if(tmpR == 7) {myMondai[i] = -10}
                        break;
                    }
                    
                    if(myMondai[i] == myMondai[i-1]) {check = true}
                    
                } while(check);
                
                myKotae += myMondai[i];
                
            }
            break;
        }
    }
    
    $("#AnsInput").hide();      //答え入力テンキーを非表示に
    $(".dan_menu .sub_menu").hide();    //サブメニューを非表示に
     
    //メニューバーをクリック
    $('.main_menu').on("click", function () {

        if ($('+ul.sub_menu', this).css('display') === 'none') {
            $('ul.sub_menu').slideUp();
            $('+ul.sub_menu', this).slideDown();
            
            var level_name = $('+ul.sub_menu', this).find("option:selected").text();
            var level_ID = $('+ul.sub_menu', this).find("option:selected").val();
            
            $("#HeaderDisplay").text(level_name);
            SetMondaiSpec(level_ID);
        }
    });

    //答え入力のインプットフィールドでエンターキーを押す
    $("#kotaeText").keypress(function (ev) {
        if ((ev.which && ev.which === 13) || (ev.keyCode && ev.keyCode === 13)) {
            AnswerCheck();
        }
    });

    //スタートボタンをクリック
    $("#StartButton").on("click", function () {
        myCnt = 0;
        myKotae = 0;
        
        $("#kotaeText").val("");
        $(this).prop("disabled",true);
        
        $("html,body").animate({scrollTop:$("#HeaderDisplay").offset().top - 50});
        
        Sakumon();
        
        Ready();

    });

    //テンキーの数字ボタンをクリック
    $("button.num").on("click", function () {
        var keyValue = $("#kotaeText").val() + $(this).val();
        $("#kotaeText").val(keyValue);
    })

    //テンキーのクリアーボタンをクリック
    $("#ClearButton").on("click", function () {
        $("#kotaeText").val("");
    })
    
    //テンキーの判定ボタンをクリック
    $("#JudgeButton").on("click", function () {
        AnswerCheck();
    })
    
    //リストボックスから級・段を選ぶ
    $("select.select_level").change(function () {
        
        var level_name = $(this).children("option:selected").text();
        var level_ID = $(this).children("option:selected").val();
        
        $("#HeaderDisplay").text(level_name);
        //$("ul.sub_menu").hide();
        
        SetMondaiSpec(level_ID);
    })
        
    function SetMondaiSpec(level_ID) {    
        switch(level_ID){
            case "D00" :    //十段
                difficulty = 5;
                Keta = 3;
                Kuchi = 15;
                Interval = 200;
                break;
            case "D05" :    //準十段
                difficulty = 5;
                Keta = 3;
                Kuchi = 15;
                Interval = 240;
                break;
            case "D90" :    //九段
                difficulty = 5;
                Keta = 3;
                Kuchi = 15;
                Interval = 267;
                break;
            case "D95" :    //準九段
                difficulty = 5;
                Keta = 3;
                Kuchi = 12;
                Interval = 267;
                break;
            case "D80" :    //八段
                difficulty = 5;
                Keta = 3;
                Kuchi = 12;
                Interval = 333;
                break;
            case "D85" :    //準八段
                difficulty = 5;
                Keta = 3;
                Kuchi = 10;
                Interval = 333;
                break;
            case "D70" :    //七段
                difficulty = 5;
                Keta = 3;
                Kuchi = 10;
                Interval = 400;
                break;
            case "D75" :    //準七段
                difficulty = 5;
                Keta = 3;
                Kuchi = 9;
                Interval = 400;
                break;
            case "D60" :    //六段
                difficulty = 5;
                Keta = 3;
                Kuchi = 9;
                Interval = 444;
                break;
            case "D65" :    //準六段
                difficulty = 5;
                Keta = 3;
                Kuchi = 8;
                Interval = 444;
                break;
            case "D50" :    //五段
                difficulty = 5;
                Keta = 3;
                Kuchi = 8;
                Interval = 500;
                break;
            case "D55" :    //準五段
                difficulty = 5;
                Keta = 3;
                Kuchi = 7;
                Interval = 500;
                break;
            case "D40" :    //四段
                difficulty = 5;
                Keta = 3;
                Kuchi = 7;
                Interval = 571;
                break;
            case "D45" :    //準四段
                difficulty = 5;
                Keta = 3;
                Kuchi = 6;
                Interval = 571;
                break;
            case "D30" :    //三段
                difficulty = 5;
                Keta = 3;
                Kuchi = 6;
                Interval = 667;
                break;
            case "D35" :    //準三段
                difficulty = 5;
                Keta = 3;
                Kuchi = 5;
                Interval = 667;
                break;
            case "D20" :    //二段
                difficulty = 5;
                Keta = 3;
                Kuchi = 5;
                Interval = 800;
                break;
            case "D25" :    //準二段
                difficulty = 5;
                Keta = 3;
                Kuchi = 4;
                Interval = 800;
                break;
            case "D10" :    //初段
                difficulty = 5;
                Keta = 3;
                Kuchi = 4;
                Interval = 1000;
                break;
            case "D15" :    //準初段
                difficulty = 5;
                Keta = 3;
                Kuchi = 3;
                Interval = 1000;
                break;
            case "K1" :    //１級
                difficulty = 5;
                Keta = 2;
                Kuchi = 15;
                Interval = 867;
                break;
            case "K2" :    //２級
                difficulty = 5;
                Keta = 2;
                Kuchi = 12;
                Interval = 1000;
                break;
            case "K3" :    //３級
                difficulty = 5;
                Keta = 2;
                Kuchi = 10;
                Interval = 1200;
                break;
            case "K4" :    //４級
                difficulty = 4;
                Keta = 2;
                Kuchi = 8;
                Interval = 1375;
                break;
            case "K5" :    //５級
                difficulty = 4;
                Keta = 2;
                Kuchi = 7;
                Interval = 1429;
                break;
            case "K6" :    //６級
                difficulty = 4;
                Keta = 2;
                Kuchi = 6;
                Interval = 1500;
                break;
            case "K7" :    //７級
                difficulty = 4;
                Keta = 2;
                Kuchi = 5;
                Interval = 1600;
                break;
            case "K8" :    //８級
                difficulty = 4;
                Keta = 2;
                Kuchi = 4;
                Interval = 1750
                break;
            case "K9" :    //９級
                difficulty = 4;
                Keta = 2;
                Kuchi = 3;
                Interval = 2000;
                break;
            case "K10" :    //１０級
                difficulty = 4;
                Keta = 2;
                Kuchi = 2;
                Interval = 2000;
                break;
            case "K11" :    //１１級
                difficulty = 3;
                Keta = 2;
                Kuchi = 4;
                Interval = 2000;
                break;
            case "K12" :    //１２級
                difficulty = 3;
                Keta = 2;
                Kuchi = 2;
                Interval = 1500;
                break;
            case "K13" :    //１３級
                difficulty = 7;
                Keta = 1;
                Kuchi = 20;
                Interval = 750;
                break;
            case "K14" :    //１４級
                difficulty = 2;
                Keta = 1;
                Kuchi = 15;
                Interval = 1000;
                break;
            case "K15" :    //１５級
                difficulty = 2;
                Keta = 1;
                Kuchi = 12;
                Interval = 1250;
                break;
            case "K16" :    //１６級
                difficulty = 2;
                Keta = 1;
                Kuchi = 10;
                Interval = 1200;
                break;
            case "K17" :    //１７級
                difficulty = 2;
                Keta = 1;
                Kuchi = 8;
                Interval = 1400;
                break;
            case "K18" :    //１８級
                difficulty = 2;
                Keta = 1;
                Kuchi = 5;
                Interval = 1400;
                break;
            case "K19" :    //１９級
                difficulty = 2;
                Keta = 1;
                Kuchi = 3;
                Interval = 1667;
                break;
            case "K20" :    //２０級
                difficulty = 6;
                Keta = 1;
                Kuchi = 3;
                Interval = 1667;
                break;
        }
    }
    
})
