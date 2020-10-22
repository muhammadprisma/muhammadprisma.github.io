const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

// Susun Soal
let questions = [
    {
        question : "Siapakah salah satu nama Maskot Souju Empire ini?",
        imgSrc : "img/soal1.jpg",
        choiceA : "Spagos",
        choiceB : "Barbos",
        choiceC : "Alfi",
        correct : "A"
    },{
        question : "dimulai harga berapakah produk ini dijual?",
        imgSrc : "img/soal2.jpg",
        choiceA : "Rp 10.000",
        choiceB : "Rp 15.000",
        choiceC : "Rp 50.000",
        correct : "B"
    },{
        question : "Apakah ini logo Saoju Empire",
        imgSrc : "img/soal3.jfif",
        choiceA : "ambo ragu-ragu",
        choiceB : "Salah",
        choiceC : "Benar",
        correct : "C"
    }
];

// Deklarasikan variabel
const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 10; // 10s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// memproses Pertanyaan
function renderQuestion(){
    let q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    qImg.innerHTML = "<img src="+ q.imgSrc +">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}
start.addEventListener("click",startQuiz);

//Menampilkan Quiz
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}
//Proses menjalankan Quiz
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}
//Hitung Waktu proses
function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        // pengaturan warna merah ketika proses
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // akhir quiz
            clearInterval(TIMER);
            scoreRender();
        }
    }
}
// pengecekan jawaban
function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // untuk jawaban benar
        score++;
        // ubah ke hijau atas jawaban benar
        answerIsCorrect();
    }else{
        // jawaban salah
        // ubah ke merah atas jawaban salah
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // akhir quiz dan tampilkan skor
        clearInterval(TIMER);
        scoreRender();
    }
}
// untuk jawaban benar
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}
// untuk jawaban salah
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}
// hasil proses
function scoreRender(){
    scoreDiv.style.display = "block";
    
    // menghitung jumlah skor
    const scorePerCent = Math.round(100 * score/questions.length);
    
    // tampilkan gambar sebagai representasi hasil
    let img = (scorePerCent >= 99) ? "img/menang.png":
              (scorePerCent >= 0) ? "img/kalah.png" :
              "img/kalah.png";
    
    scoreDiv.innerHTML = "<img src="+ img +">";
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
}