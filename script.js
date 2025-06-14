class FlashCalculationGame {
    constructor() {
        this.mondai = new Array(30);
        this.currentCount = 0;
        this.correctAnswer = 0;
        this.digits = 2;
        this.numbers = 2;
        this.interval = 2000;
        this.difficulty = 4;
        
        // 新機能：5問制テスト
        this.currentProblem = 1;
        this.correctCount = 0;
        this.totalProblems = 5;
        this.currentLevelName = "１０級";
        
        // ゲーム進行状態管理
        this.isGameInProgress = false;
        
        this.init();
    }
    
    // トップに戻る機能
    backToTop() {
        // ゲームが進行中の場合は中断
        if (this.isGameInProgress) {
            this.quitGame();
        }
        
        // モーダルを閉じる
        document.getElementById('resultModal').style.display = 'none';
        
        // マニュアル設定パネルを非表示（要素が存在する場合のみ）
        const manualSettings = document.getElementById('manualSettings');
        if (manualSettings) {
            manualSettings.style.display = 'none';
        }
        
        // ゲームをリセット
        this.resetTest();
        
        // 待ち受け画面に戻る
        this.showWelcomeScreen();
        
        // 問題表示をクリア
        document.getElementById('mondai').textContent = '';
    }
    
    init() {
        this.bindEvents();
        this.hideAnswerInput();
        this.updateProgress();
    }
    
    // 新機能：進捗更新
    updateProgress() {
        document.getElementById('progressDisplay').textContent = 
            `問題 ${this.currentProblem}/${this.totalProblems} | 正解: ${this.correctCount}`;
    }
    
    bindEvents() {
        // はじめるボタン（待ち受け画面からゲーム画面へ）
        document.getElementById('BeginButton').addEventListener('click', () => {
            this.showGameScreen();
        });
        
        // スタートボタン
        document.getElementById('StartButton').addEventListener('click', () => {
            this.startGame();
        });
        
        // やめるボタン
        document.getElementById('QuitButton').addEventListener('click', () => {
            this.quitGame();
        });
        
        // トップに戻るボタン
        document.getElementById('BackToTopButton').addEventListener('click', () => {
            this.backToTop();
        });
        
        // レベルセレクター
        document.getElementById('levelSelector').addEventListener('change', (e) => {
            this.handleLevelChange(e.target.value);
        });
        
        // テンキー
        document.querySelectorAll('.num-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.inputNumber(e.target.dataset.value);
            });
        });
        
        // クリアボタン
        document.getElementById('ClearButton').addEventListener('click', () => {
            this.clearInput();
        });
        
        // 判定ボタン
        document.getElementById('JudgeButton').addEventListener('click', () => {
            this.checkAnswer();
        });
        
        // エンターキー
        document.getElementById('kotaeText').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.checkAnswer();
            }
        });

        // 新機能：モーダル関連
        document.getElementById('closeModal').addEventListener('click', () => {
            this.resetTest();
        });

        document.getElementById('nameInput').addEventListener('input', (e) => {
            if (e.target.value.trim()) {
                this.generateQRCode();
            }
        });
        
        // ひらがなキーボードのイベントリスナー
        this.setupHiraganaKeyboard();
    }
    
    // 画面遷移関数
    showGameScreen() {
        document.getElementById('WelcomeScreen').style.display = 'none';
        document.getElementById('GameScreen').style.display = 'block';
    }
    
    showWelcomeScreen() {
        document.getElementById('GameScreen').style.display = 'none';
        document.getElementById('WelcomeScreen').style.display = 'flex';
    }
    
    // ゲーヤ中断機能
    quitGame() {
        if (this.isGameInProgress) {
            this.isGameInProgress = false;
            this.currentCount = this.numbers; // 問題表示を停止
            this.hideAnswerInput();
            document.getElementById('QuitButton').style.display = 'none';
            document.getElementById('StartButton').disabled = false;
            
            const mondaiDiv = document.getElementById('mondai');
            this.setStyle(mondaiDiv, {
                color: "#ff6b9d",
                fontSize: "40pt",
                fontFamily: 'M PLUS Rounded 1c',
                paddingTop: "50px"
            });
            mondaiDiv.innerHTML = "😢 中断しました 😢<br>またチャレンジしてください！";
        }
    }
    
    // レベル変更処理
    handleLevelChange(levelId) {
        console.log('Level changed to:', levelId); // デバッグ用
        
        if (levelId === 'MANUAL') {
            // マニュアル設定パネルを表示（要素が存在する場合のみ）
            const manualSettings = document.getElementById('manualSettings');
            if (manualSettings) {
                manualSettings.style.display = 'block';
            }
        } else {
            // マニュアル設定パネルを非表示（要素が存在する場合のみ）
            const manualSettings = document.getElementById('manualSettings');
            if (manualSettings) {
                manualSettings.style.display = 'none';
            }
            
            // レベル設定を適用
            console.log('Before setDifficulty - Current settings:', {
                difficulty: this.difficulty,
                digits: this.digits,
                numbers: this.numbers,
                interval: this.interval
            });
            
            this.setDifficulty(levelId);
            this.currentLevelName = this.getLevelName(levelId);
            
            console.log('After setDifficulty - New settings:', {
                difficulty: this.difficulty,
                digits: this.digits,
                numbers: this.numbers,
                interval: this.interval
            });
            
            // デバッグ情報を表示
            console.log('Difficulty settings:', {
                difficulty: this.difficulty,
                digits: this.digits,
                numbers: this.numbers,
                interval: this.interval,
                levelName: this.currentLevelName
            });
        }
    }
    
    // レベル名取得
    getLevelName(levelId) {
        const selector = document.getElementById('levelSelector');
        const option = selector.querySelector(`option[value="${levelId}"]`);
        return option ? option.textContent.split(' :')[0].trim() : 'カスタム';
    }
    
    // マニュアル設定適用
    applyManualSettings() {
        const ketaSelect = document.querySelector('select[name="selectKeta"]');
        const kuchiSelect = document.querySelector('select[name="selectKuchi"]');
        const speedSelect = document.querySelector('select[name="selectSpeed"]');
        
        this.digits = parseInt(ketaSelect.value);
        this.numbers = parseInt(kuchiSelect.value);
        this.interval = parseInt(speedSelect.value) * 10;
        this.difficulty = 4;
        this.currentLevelName = `カスタム(${this.digits}桁${this.numbers}口)`;
        
        // マニュアル設定パネルを非表示
        document.getElementById('manualSettings').style.display = 'none';
        
        // セレクターをマニュアル設定に戻す
        document.getElementById('levelSelector').value = 'MANUAL';
    }
    
    setDifficulty(levelId) {
        console.log('Setting difficulty for level:', levelId); // デバッグ用
        
        const levels = {
            // 段位
            "D00": { difficulty: 5, digits: 3, numbers: 15, interval: 200 },
            "D05": { difficulty: 5, digits: 3, numbers: 15, interval: 240 },
            "D90": { difficulty: 5, digits: 3, numbers: 15, interval: 267 },
            "D95": { difficulty: 5, digits: 3, numbers: 12, interval: 267 },
            "D80": { difficulty: 5, digits: 3, numbers: 12, interval: 333 },
            "D85": { difficulty: 5, digits: 3, numbers: 10, interval: 333 },
            "D70": { difficulty: 5, digits: 3, numbers: 10, interval: 400 },
            "D75": { difficulty: 5, digits: 3, numbers: 9, interval: 400 },
            "D60": { difficulty: 5, digits: 3, numbers: 9, interval: 444 },
            "D65": { difficulty: 5, digits: 3, numbers: 8, interval: 444 },
            "D50": { difficulty: 5, digits: 3, numbers: 8, interval: 500 },
            "D55": { difficulty: 5, digits: 3, numbers: 7, interval: 500 },
            "D40": { difficulty: 5, digits: 3, numbers: 7, interval: 571 },
            "D45": { difficulty: 5, digits: 3, numbers: 6, interval: 571 },
            "D30": { difficulty: 5, digits: 3, numbers: 6, interval: 667 },
            "D35": { difficulty: 5, digits: 3, numbers: 5, interval: 667 },
            "D20": { difficulty: 5, digits: 3, numbers: 5, interval: 800 },
            "D25": { difficulty: 5, digits: 3, numbers: 4, interval: 800 },
            "D10": { difficulty: 5, digits: 3, numbers: 4, interval: 1000 },
            "D15": { difficulty: 5, digits: 3, numbers: 3, interval: 1000 },
            
            // 級位
            "K1": { difficulty: 5, digits: 2, numbers: 15, interval: 867 },
            "K2": { difficulty: 5, digits: 2, numbers: 12, interval: 1000 },
            "K3": { difficulty: 5, digits: 2, numbers: 10, interval: 1200 },
            "K4": { difficulty: 4, digits: 2, numbers: 8, interval: 1375 },
            "K5": { difficulty: 4, digits: 2, numbers: 7, interval: 1429 },
            "K6": { difficulty: 4, digits: 2, numbers: 6, interval: 1500 },
            "K7": { difficulty: 4, digits: 2, numbers: 5, interval: 1600 },
            "K8": { difficulty: 4, digits: 2, numbers: 4, interval: 1750 },
            "K9": { difficulty: 4, digits: 2, numbers: 3, interval: 2000 },
            "K10": { difficulty: 4, digits: 2, numbers: 2, interval: 2000 },
            "K11": { difficulty: 3, digits: 2, numbers: 4, interval: 2000 },
            "K12": { difficulty: 3, digits: 2, numbers: 2, interval: 1500 },
            "K13": { difficulty: 7, digits: 1, numbers: 20, interval: 750 },
            "K14": { difficulty: 2, digits: 1, numbers: 15, interval: 1000 },
            "K15": { difficulty: 2, digits: 1, numbers: 12, interval: 1250 },
            "K16": { difficulty: 2, digits: 1, numbers: 10, interval: 1200 },
            "K17": { difficulty: 2, digits: 1, numbers: 8, interval: 1400 },
            "K18": { difficulty: 2, digits: 1, numbers: 5, interval: 1400 },
            "K19": { difficulty: 2, digits: 1, numbers: 3, interval: 1667 },
            "K20": { difficulty: 1, digits: 1, numbers: 3, interval: 1667 }
        };
        
        const level = levels[levelId];
        if (level) {
            this.difficulty = level.difficulty;
            this.digits = level.digits;
            this.numbers = level.numbers;
            this.interval = level.interval;
            
            console.log('Level settings applied:', level); // デバッグ用
        } else {
            console.log('Level not found:', levelId); // デバッグ用
        }
    }
    
    applyManualSettings() {
        const ketaSelect = document.querySelector('select[name="selectKeta"]');
        const kuchiSelect = document.querySelector('select[name="selectKuchi"]');
        const speedSelect = document.querySelector('select[name="selectSpeed"]');
        
        this.digits = parseInt(ketaSelect.value);
        this.numbers = parseInt(kuchiSelect.value);
        this.interval = parseInt(speedSelect.value) * 10;
        this.difficulty = 4;
        this.currentLevelName = `カスタム(${this.digits}桁${this.numbers}口)`;
        
        const headerText = `マニュアル設定 : ${this.digits}桁 ${this.numbers}口 ${this.interval/1000}秒`;
        this.updateHeaderDisplay(headerText);
        
        this.hideAllSubMenus();
    }
    
    startGame() {
        this.currentCount = 0;
        this.correctAnswer = 0;
        this.resetTest(); // 新機能
        this.clearInput();
        this.isGameInProgress = true; // ゲーム開始
        
        const startBtn = document.getElementById('StartButton');
        startBtn.disabled = true;
        
        // やめるボタンを表示
        document.getElementById('QuitButton').style.display = 'inline-block';
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        this.generateProblems();
        this.showReady();
    }

    // 新機能：テストリセット
    resetTest() {
        this.currentProblem = 1;
        this.correctCount = 0;
        this.isGameInProgress = false; // ゲーム終了
        this.updateProgress();
        document.getElementById('resultModal').style.display = 'none';
        document.getElementById('nameInput').value = '';
        document.getElementById('qrcode').innerHTML = '';
        document.getElementById('StartButton').disabled = false;
        document.getElementById('QuitButton').style.display = 'none'; // やめるボタンを非表示
    }
    
    showReady() {
        const mondaiDiv = document.getElementById('mondai');
        this.setStyle(mondaiDiv, {
            color: "#FFE4E1",
            fontSize: "20pt",
            fontFamily: 'Righteous',
            paddingTop: "40px"
        });
        mondaiDiv.textContent = "READY";
        
        setTimeout(() => {
            mondaiDiv.style.fontSize = '60pt';
            setTimeout(() => {
                mondaiDiv.textContent = "";
                setTimeout(() => {
                    mondaiDiv.style.fontSize = '70pt';
                    mondaiDiv.textContent = "START";
                    setTimeout(() => {
                        mondaiDiv.textContent = "";
                        this.setStyle(mondaiDiv, {
                            color: "#ff6b9d",
                            fontSize: "120px",
                            fontFamily: 'M PLUS Rounded 1c',
                            fontWeight: "900",
                            paddingTop: "30px"
                        });
                        setTimeout(() => {
                            this.showProblem();
                        }, 700);
                    }, 700);
                }, 700);
            }, 800);
        }, 100);
    }
    
    showProblem() {
        if (this.currentCount < this.numbers && this.isGameInProgress) {
            const mondaiDiv = document.getElementById('mondai');
            this.setStyle(mondaiDiv, {
                color: "#ff6b9d",
                fontSize: "120px",
                fontFamily: 'M PLUS Rounded 1c',
                fontWeight: "900"
            });
            mondaiDiv.textContent = this.mondai[this.currentCount];
            this.currentCount++;
            
            setTimeout(() => {
                if (this.isGameInProgress) {
                    this.hideInterval();
                }
            }, this.interval * 0.7);
        } else if (this.isGameInProgress) {
            this.showAnswerInput();
        }
    }
    
    hideInterval() {
        const mondaiDiv = document.getElementById('mondai');
        // 文字を完全に消す
        mondaiDiv.textContent = "";
        
        setTimeout(() => {
            if (this.isGameInProgress) {
                this.showProblem();
            }
        }, this.interval * 0.3);
    }
    
    showAnswerInput() {
        const ansInput = document.getElementById('AnsInput');
        ansInput.classList.add('active');
        
        setTimeout(() => {
            document.getElementById('kotaeText').focus();
        }, 100);
    }
    
    hideAnswerInput() {
        document.getElementById('AnsInput').classList.remove('active');
    }
    
    inputNumber(value) {
        const input = document.getElementById('kotaeText');
        input.value += value;
    }
    
    clearInput() {
        document.getElementById('kotaeText').value = "";
    }
    
    checkAnswer() {
        const inputAns = document.getElementById('kotaeText').value;
        
        if (this.isNumeric(inputAns)) {
            const userAnswer = Number(inputAns);
            this.hideAnswerInput();
            this.isGameInProgress = false; // ゲーム終了
            document.getElementById('QuitButton').style.display = 'none'; // やめるボタンを非表示
            
            const mondaiDiv = document.getElementById('mondai');
            const isCorrect = (userAnswer === this.correctAnswer);
            
            if (isCorrect) {
                this.correctCount++; // 新機能：正解数カウント
                this.setStyle(mondaiDiv, {
                    color: "lightgoldenrodyellow",
                    fontSize: "60pt",
                    fontFamily: 'Kosugi Maru',
                    paddingTop: "10px"
                });
                mondaiDiv.innerHTML = "ご明算<br>正解!";
                this.celebrateSuccess();
            } else {
                this.setStyle(mondaiDiv, {
                    color: "lightblue",
                    fontSize: "30pt",
                    fontFamily: 'Sawarabi Gothic',
                    paddingTop: "20px"
                });
                mondaiDiv.innerHTML = `残念<br>正解は ${this.correctAnswer} です`;
            }
            
            this.updateProgress(); // 新機能：進捗更新
            
            // 新機能：3問正解で即座に合格判定
            if (this.correctCount >= 3) {
                setTimeout(() => {
                    this.showResult();
                }, 2000);
                return;
            }
            
            // 新機能：5問制判定
            setTimeout(() => {
                if (this.currentProblem >= this.totalProblems) {
                    this.showResult();
                } else {
                    this.currentProblem++;
                    mondaiDiv.textContent = "";
                    this.clearInput();
                    setTimeout(() => {
                        this.currentCount = 0;
                        this.correctAnswer = 0;
                        this.generateProblems();
                        this.isGameInProgress = true; // 次の問題のゲーム開始
                        document.getElementById('QuitButton').style.display = 'inline-block'; // やめるボタンを再表示
                        this.showReady();
                    }, 1000);
                }
            }, 2000);
        } else {
            this.clearInput();
        }
    }

    // 新機能：結果表示
    showResult() {
        const isPassed = this.correctCount >= 3;
        let resultText = "";
        
        if (isPassed) {
            resultText = '<div class="pass">🎉 合格おめでとうございます！ 🎉</div>';
            resultText += `<div class="result-score">${this.currentLevelName} : ${this.correctCount}/${this.totalProblems}問正解</div>`;
            document.getElementById('certificateSection').style.display = 'block';
        } else {
            resultText = '<div class="fail">😢 不合格です 😢</div>';
            resultText += `<div class="result-score">${this.currentLevelName} : ${this.correctCount}/${this.totalProblems}問正解</div>`;
            resultText += '<p style="color: #666; margin-top: 15px;">3問以上正解で合格です。もう一度チャレンジしてください！</p>';
            document.getElementById('certificateSection').style.display = 'none';
        }
        
        document.getElementById('resultText').innerHTML = resultText;
        document.getElementById('resultModal').style.display = 'block';
        
        // 合格時に名前入力フィールドをフォーカス
        if (isPassed) {
            setTimeout(() => {
                const nameInput = document.getElementById('nameInput');
                nameInput.focus();
            }, 500);
        }
    }

    // 新機能：QRコード生成
    generateQRCode() {
        const userName = document.getElementById('nameInput').value.trim();
        if (!userName) return;
        
        const currentDate = new Date().toLocaleDateString('ja-JP');
        const certificateUrl = 'https://flash-event.vercel.app/certificate.html?' + 
            'name=' + encodeURIComponent(userName) +
            '&level=' + encodeURIComponent(this.currentLevelName) +
            '&score=' + encodeURIComponent(this.correctCount + '/' + this.totalProblems) +
            '&date=' + encodeURIComponent(currentDate);
        
        const qrcodeDiv = document.getElementById('qrcode');
        qrcodeDiv.innerHTML = '';
        const qr = qrcode(0, 'M');
        qr.addData(certificateUrl);
        qr.make();
        qrcodeDiv.innerHTML = qr.createImgTag(4);
    }
    
    // ひらがなキーボードの設定
    setupHiraganaKeyboard() {
        // 文字キーのイベントリスナー
        document.querySelectorAll('.key[data-char]').forEach(key => {
            key.addEventListener('click', (e) => {
                const char = e.target.dataset.char;
                this.addCharToName(char);
            });
        });
        
        // バックスペースキー
        document.getElementById('backspace').addEventListener('click', () => {
            this.backspaceName();
        });
        
        // クリアキー
        document.getElementById('clearName').addEventListener('click', () => {
            this.clearName();
        });
    }
    
    // 名前に文字を追加
    addCharToName(char) {
        const nameInput = document.getElementById('nameInput');
        nameInput.value += char;
        
        // 入力イベントを発生させてQRコードを更新
        nameInput.dispatchEvent(new Event('input'));
        
        // ボタンのフィードバックアニメーション
        this.animateKeyPress(event.target);
    }
    
    // 最後の文字を削除
    backspaceName() {
        const nameInput = document.getElementById('nameInput');
        nameInput.value = nameInput.value.slice(0, -1);
        
        // 入力イベントを発生させてQRコードを更新
        nameInput.dispatchEvent(new Event('input'));
        
        // ボタンのフィードバックアニメーション
        this.animateKeyPress(document.getElementById('backspace'));
    }
    
    // 名前をクリア
    clearName() {
        const nameInput = document.getElementById('nameInput');
        nameInput.value = '';
        
        // QRコードをクリア
        document.getElementById('qrcode').innerHTML = '';
        
        // ボタンのフィードバックアニメーション
        this.animateKeyPress(document.getElementById('clearName'));
    }
    
    // キープレスアニメーション
    animateKeyPress(button) {
        button.style.transform = 'translateY(2px) scale(0.95)';
        button.style.boxShadow = '0 1px 3px rgba(255, 107, 157, 0.3)';
        
        setTimeout(() => {
            button.style.transform = '';
            button.style.boxShadow = '';
        }, 150);
    }
    
    celebrateSuccess() {
        const mondaiDiv = document.getElementById('mondai');
        mondaiDiv.style.animation = 'pulse 0.5s ease-in-out 3';
        this.createConfetti();
    }
    
    createConfetti() {
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.style.position = 'fixed';
                confetti.style.width = '10px';
                confetti.style.height = '10px';
                confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
                confetti.style.left = Math.random() * window.innerWidth + 'px';
                confetti.style.top = '-10px';
                confetti.style.zIndex = '9999';
                confetti.style.borderRadius = '50%';
                confetti.style.pointerEvents = 'none';
                
                document.body.appendChild(confetti);
                
                const animation = confetti.animate([
                    { transform: 'translateY(0px) rotate(0deg)', opacity: 1 },
                    { transform: `translateY(${window.innerHeight + 100}px) rotate(720deg)`, opacity: 0 }
                ], {
                    duration: 3000,
                    easing: 'ease-out'
                });
                
                animation.onfinish = () => {
                    if (document.body.contains(confetti)) {
                        document.body.removeChild(confetti);
                    }
                };
            }, i * 50);
        }
    }
    
    isNumeric(value) {
        return !isNaN(parseFloat(value)) && isFinite(value);
    }
    
    setStyle(element, styleObj) {
        Object.keys(styleObj).forEach(key => {
            element.style[key] = styleObj[key];
        });
    }
    
    duplicatedCheck(str) {
        const checkString = str.toString();
        const stringLength = checkString.length;
        
        for (let i = 0; i < stringLength - 1; i++) {
            for (let j = i + 1; j < stringLength; j++) {
                if (checkString.substr(i, 1) === checkString.substr(j, 1)) {
                    return true;
                }
            }
        }
        return false;
    }
    
    generateProblems() {
        console.log('Generating problems with settings:', {
            difficulty: this.difficulty,
            digits: this.digits,
            numbers: this.numbers,
            interval: this.interval
        }); // デバッグ用
        
        this.correctAnswer = 0;
        
        switch (this.difficulty) {
            case 1:
                this.generateLevel1Problems();
                break;
            case 2:
                this.generateLevel2Problems();
                break;
            case 3:
                this.generateLevel3Problems();
                break;
            case 4:
                this.generateLevel4Problems();
                break;
            case 5:
                this.generateLevel5Problems();
                break;
            case 6:
                this.generateLevel6Problems();
                break;
            case 7:
                this.generateLevel7Problems();
                break;
        }
        
        this.correctAnswer = 0;
        for (let i = 0; i < this.numbers; i++) {
            this.correctAnswer += this.mondai[i];
        }
        
        console.log('Generated problems:', this.mondai.slice(0, this.numbers)); // デバッグ用
        console.log('Correct answer:', this.correctAnswer); // デバッグ用
    }
    
    generateLevel1Problems() {
        // 20級：1桁の繰り上がり下がりない問題（五玉無し）
        for (let i = 0; i < this.numbers; i++) {
            let check;
            do {
                check = false;
                const tmpR = Math.floor(Math.random() * 4) + 1;
                if (tmpR === 1) this.mondai[i] = 1;
                if (tmpR === 2) this.mondai[i] = 2;
                if (tmpR === 3) this.mondai[i] = 3;
                if (tmpR === 4) this.mondai[i] = 4;
                
                if (i > 0 && this.mondai[i] === this.mondai[i-1]) {
                    check = true;
                }
            } while (check);
        }
    }
    
    generateLevel2Problems() {
        for (let i = 0; i < this.numbers; i++) {
            this.mondai[i] = Math.floor(Math.random() * 8) + 1;
        }
    }
    
    generateLevel3Problems() {
        for (let i = 0; i < this.numbers; i++) {
            let check;
            do {
                check = false;
                this.mondai[i] = Math.floor(Math.random() * 89) + 10;
                
                if (i > 0 && this.mondai[i] === this.mondai[i-1]) {
                    check = true;
                }
            } while (check);
        }
    }
    
    generateLevel4Problems() {
        for (let i = 0; i < this.numbers; i++) {
            let check;
            do {
                check = false;
                
                const min = Math.pow(10, this.digits - 1);
                const max = Math.pow(10, this.digits) - 1;
                this.mondai[i] = Math.floor(Math.random() * (max - min + 1)) + min;
                
                check = this.duplicatedCheck(this.mondai[i]);
                
                if (i > 0 && this.mondai[i] === this.mondai[i-1]) {
                    check = true;
                }
            } while (check);
        }
    }
    
    generateLevel5Problems() {
        for (let i = 0; i < this.numbers; i++) {
            let check;
            do {
                check = false;
                
                const min = Math.pow(10, this.digits - 1);
                const max = Math.pow(10, this.digits) - 1;
                this.mondai[i] = Math.floor(Math.random() * (max - min + 1)) + min;
                
                check = this.duplicatedCheck(this.mondai[i]);
                
                if (i > 0) {
                    const prevStr = this.mondai[i-1].toString();
                    const nowStr = this.mondai[i].toString();
                    
                    for (let j = 0; j < this.digits; j++) {
                        if (prevStr[j] === nowStr[j]) {
                            check = true;
                            break;
                        }
                    }
                }
            } while (check);
        }
    }
    
    generateLevel6Problems() {
        const zeroPosition = Math.floor(Math.random() * this.numbers);
        
        for (let i = 0; i < this.numbers; i++) {
            let check;
            do {
                check = false;
                
                if (i === zeroPosition) {
                    this.mondai[i] = Math.floor(Math.random() * 90) + 10;
                } else {
                    this.mondai[i] = (Math.floor(Math.random() * 9) + 1) * 10;
                }
                
                check = this.duplicatedCheck(this.mondai[i]);
                
                if (i > 0 && this.mondai[i] === this.mondai[i-1]) {
                    check = true;
                }
            } while (check);
        }
    }
    
    generateLevel7Problems() {
        for (let i = 0; i < this.numbers; i++) {
            let check;
            do {
                check = false;
                
                const choices = [10, 20, 30, 50, 60, 70, 80];
                this.mondai[i] = choices[Math.floor(Math.random() * choices.length)];
                
                if (i > 0 && this.mondai[i] === this.mondai[i-1]) {
                    check = true;
                }
            } while (check);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new FlashCalculationGame();
});

const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);