import '../TestPage.css';
function TestPage() {
    return (
      <>
        <div className='progressBar'>
          <div className='progressInner'></div>
        </div>
        <div className="testContent">
          <div className='qustionWrap'>
            <img className='textWrap' src="/images/icon/Union.png" alt='logo image' />
            <p className='qna'>하이디라오로 가는길에 천러를 만났다 !! 이럴때 나는??</p>
          </div>
          <div className='answerWrap'>
            <div className='mb-8'>
              <p>당장 달려가 천러에게 시즈니임을 밝히고 하딜간다고 자랑한다 !! </p>
            </div>
            <div>
              <p>멀리서 멀리서 우리 천러 하면서 바라만 본다..</p>
            </div>
          </div>
        </div>
      </>
    );
  }
  
  export default TestPage;
  