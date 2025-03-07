// 천 단위 구분기호 자동 추가 함수
function formatNumber(input) {
    let value = input.value.replace(/,/g, '');  // 기존의 쉼표 제거
    if (isNaN(value) || value === '') {
        input.value = '';  // 숫자가 아닐 경우 빈 값 처리
    } else {
        // 천 단위 구분 기호 추가
        input.value = Number(value).toLocaleString();
    }
}

// 계산 함수
function calculate() {
    // 사용자 입력값을 가져오기
    const fragmentPriceInWon = parseFloat(document.getElementById("fragmentPriceInWon").value.replace(/,/g, ''));
    const mesoPriceInWonMin = parseFloat(document.getElementById("mesoPriceInWonMin").value.replace(/,/g, ''));
    const mesoPriceInWonMax = parseFloat(document.getElementById("mesoPriceInWonMax").value.replace(/,/g, ''));

    const fragmentPriceInMesoMin = parseFloat(document.getElementById("fragmentPriceInMesoMin").value.replace(/,/g, ''));
    const fragmentPriceInMesoMax = parseFloat(document.getElementById("fragmentPriceInMesoMax").value.replace(/,/g, ''));

    if (isNaN(fragmentPriceInWon) || isNaN(mesoPriceInWonMin) || isNaN(mesoPriceInWonMax) || 
        isNaN(fragmentPriceInMesoMin) || isNaN(fragmentPriceInMesoMax)) {
        alert("모든 값을 정확히 입력해주세요.");
        return;
    }

    // 1) 원화로 직접 구매 시
    const mesoForFragmentMin = fragmentPriceInWon * 52307.69;
    const mesoForFragmentMax = fragmentPriceInWon * 52307.69;

    // 2) 메소로 구매 후 원화 계산
    // 1억 메소의 가격을 원화로 계산
    const averageMesoPriceInWon = (mesoPriceInWonMin + mesoPriceInWonMax) / 2;
    
    // 1억 메소당 원화로 계산
    const mesoPriceForOneFragmentInMesoMin = fragmentPriceInMesoMin * averageMesoPriceInWon / 100000000;
    const mesoPriceForOneFragmentInMesoMax = fragmentPriceInMesoMax * averageMesoPriceInWon / 100000000;

    // 결과 출력
    let resultText = `<strong>결과:</strong><br>`;
    resultText += `1. 원화로 직접 구매 시:<br>조각 가격 (평균): ${fragmentPriceInWon} 원<br>`;
    resultText += `2. 메소로 구매 후 원화로 계산 시:<br>조각 가격 (최소): ${mesoPriceForOneFragmentInMesoMin.toFixed(2)} 원<br>`;
    resultText += `조각 가격 (최대): ${mesoPriceForOneFragmentInMesoMax.toFixed(2)} 원<br>`;

    if (mesoPriceForOneFragmentInMesoMin < fragmentPriceInWon) {
        resultText += `<strong>결론:</strong> 메소로 구매하는 것이 더 저렴합니다!<br>`;
    } else {
        resultText += `<strong>결론:</strong> 원화로 직접 구매하는 것이 더 저렴합니다!<br>`;
    }

    document.getElementById("result").innerHTML = resultText;
}
