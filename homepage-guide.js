(()=>{
  const guide=document.getElementById('loginTutorial');
  const play=document.getElementById('guidePlay');
  if(!guide||!play)return;
  const id=document.getElementById('guideId');
  const password=document.getElementById('guidePassword');
  const signIn=document.getElementById('guideSignIn');
  const title=document.getElementById('guideTitle');
  const text=document.getElementById('guideText');
  const progress=document.getElementById('guideProgress');
  const stages=[
    {title:'Step 1 of 3 · Enter your Student ID',text:'Type the Student ID provided by your class or the System Administrator.'},
    {title:'Step 2 of 3 · Enter your password',text:'Enter the password associated with your Student Portal account.'},
    {title:'Step 3 of 3 · Sign in to continue',text:'Select Sign In to open your learning materials and assessments.'}
  ];
  let timer=null;
  const stop=()=>{if(timer){clearInterval(timer);timer=null}play.innerHTML='▶&nbsp; Play guide'};
  const setStep=(step)=>{
    guide.dataset.step=String(step);
    title.textContent=stages[step-1].title;
    text.textContent=stages[step-1].text;
    id.classList.toggle('is-active',step===1);
    id.classList.toggle('is-filled',step>1);
    password.classList.toggle('is-active',step===2);
    password.classList.toggle('is-filled',step>2);
    signIn.classList.toggle('is-ready',step===3);
    if(step>1)id.innerHTML='STU-2026-014<span>✓</span>';
    else id.innerHTML='Enter your Student ID<span class="guide-cursor"></span>';
    if(step>2)password.innerHTML='••••••••<span class="guide-lock">●</span>';
    else password.innerHTML='Enter your password<span class="guide-lock">●</span>';
    progress.style.width=((step-1)*50)+'%';
  };
  play.addEventListener('click',()=>{
    if(timer){stop();setStep(1);return}
    setStep(1);play.textContent='Ⅱ  Pause guide';
    let step=1;
    timer=setInterval(()=>{
      step+=1;
      if(step>3){progress.style.width='100%';stop();window.setTimeout(()=>{setStep(1)},1100);return}
      setStep(step);
    },3000);
  });
  setStep(1);
})();

