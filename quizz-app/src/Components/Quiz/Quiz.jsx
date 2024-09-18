/* eslint-disable no-unused-vars */
import React, { useRef, useState } from "react";
import "./Quiz.css";
import { data } from "../../assets/data";

const Quiz = () => {
  let [index, setİndex] = useState(0); // Soruların dizinini tutan state.
  let [question, setQuestion] = useState(data[index]); // Mevcut soruyu tutan state.
  let [lock,setLock] = useState(false); // Cevaplandıktan sonra soruyu kilitlemek için kullanılan state.
  let [score, setScore] = useState(0); // Skoru tutan state.
  let [result, setResult] = useState(false); // Quiz'in sonucunu göstermek için kullanılan state.

  let Option1 = useRef(null); // İlk seçeneğe referans oluşturuyoruz.
  let Option2 = useRef(null); // İkinci seçeneğe referans oluşturuyoruz.
  let Option3 = useRef(null); // Üçüncü seçeneğe referans oluşturuyoruz.
  let Option4 = useRef(null); // Dördüncü seçeneğe referans oluşturuyoruz.
  let option_array = [Option1, Option2, Option3, Option4]; // Tüm seçenekleri bir diziye topluyoruz.
  
  // Cevap kontrol fonksiyonu

  const checkAns = (e, ans) => {
    if (lock === false) {
      // Eğer kilitli değilse
      if (question.ans === ans) {
        // Eğer doğru cevap seçildiyse
        e.target.classList.add("correct"); // Seçeneğe "correct" sınıfı eklenir.
        setLock(true); // Soruyu kilitliyoruz, bir daha cevaplanamaz.
        setScore((prev) => prev + 1); // Skoru bir arttırıyoruz.
        //
      } else {
        // Yanlış cevap seçildiyse
        e.target.classList.add("wrong"); // Seçeneğe "wrong" sınıfı eklenir.
        setLock(true); // Soruyu kilitliyoruz.
        option_array[question.ans - 1].current.classList.add("correct"); // Doğru cevabı gösteriyoruz.
      }
    }
  };
  // Sonraki soruya geçiş fonksiyonu

  const next = () => {
    if (lock === true) {
      // Eğer soru kilitliyse
      if (index === data.length - 1) {
        // Eğer son sorudaysak
        setResult(true); // Sonuçları gösteriyoruz.
        return 0; // Fonksiyondan çıkıyoruz.
      }
      setİndex(++index); // Sorunun dizinini bir arttırıyoruz.
      setQuestion(data[index]); // Bir sonraki soruya geçiyoruz.
      setLock(false); // Soruyu tekrar açıyoruz.
      option_array.map((option) => {
        // Tüm seçeneklerden yanlış ve doğru sınıflarını kaldırıyoruz.
        option.current.classList.remove("wrong");
        option.current.classList.remove("correct");
      });
    }
  };
  // Quiz'i sıfırlama fonksiyonu

  const reset = () => {
    setİndex(0); // Dizini sıfırlıyoruz.
    setQuestion(data[0]); // İlk soruya geri dönüyoruz.
    setScore(0); // Skoru sıfırlıyoruz.
    setLock(false); // Soruyu açıyoruz.
    setResult(false); // Sonuçları gizliyoruz.
  };
  //
  return (
    // Quiz bileşeninin JSX yapısını oluşturuyoruz.
    <div className="container">
      <h1>Quiz App</h1>
      <hr />
      {result ? <></> : 
        // Eğer sonuç gösterilmiyorsa
        <>
          <h2>
            {index + 1}. {question.question}
          </h2>
          <ul>
             {/* // Seçeneğe tıklandığında cevap kontrol fonksiyonunu çağırıyoruz. */}
            <li ref={Option1} onClick={(e) => {checkAns(e, 1);}}>
               {question.option1} 
               </li>

            <li ref={Option2} onClick={(e) => { checkAns(e, 2); }}>
              {question.option2}
            </li>

            <li ref={Option3} onClick={(e) => {checkAns(e, 3);}}>
              {question.option3}
            </li>

            <li ref={Option4} onClick={(e) => { checkAns(e, 4);}}>
              {question.option4}
            </li>
          </ul>

          <button onClick={next}>Next</button>
          <div className="index">
            {index + 1} of {data.length} questions
            {/* Soru sayısını gösteren alan */}
            </div>
        </>
      }
      {result ? (
        // Eğer sonuçlar gösterilmesi gerekiyorsa
        <>
          <h2>
            You Scored {score} out of {data.length}{" "}
            {/* Toplam skoru gösteriyoruz */}
          </h2>
          <button onClick={reset}>Reset</button> {/* Quiz'i sıfırlayan buton */}
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Quiz;
