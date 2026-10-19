const initialCode = document.getElementById('code').value;
const courses = {
 fundamentals:{title:'Coding Fundamentals',desc:'Mission 001: Understand the sequence.',content:'<p><b>Concept:</b> A computer follows instructions in order.</p><p>Try this: write down three steps for making a sandwich. That is an algorithm—a set of steps for completing a task.</p>'},
 games:{title:'Game Development',desc:'Mission 001: Plan your first game.',content:'<p><b>Concept:</b> A game combines a goal, rules, player actions, and feedback.</p><p>Challenge: design a game where a character collects five stars without touching obstacles.</p>'},
 web:{title:'Web Development',desc:'Mission 001: Meet HTML.',content:'<p><b>Concept:</b> HTML structures content, CSS styles it, and JavaScript adds behaviour.</p><p>Try the Coding Lab below: change the heading text, then press Run code.</p>'},
 python:{title:'Python Programming',desc:'Mission 001: Print a message.',content:'<p><b>Concept:</b> Python is a beginner-friendly programming language.</p><p>Example: <code>print("Hello, future coder!")</code> displays a message. This website preview runs HTML, not Python.</p>'},
 ai:{title:'Artificial Intelligence',desc:'Mission 001: Explore AI.',content:'<p><b>Concept:</b> AI systems perform tasks such as recognising patterns or generating text.</p><p>Challenge: list one task where AI could help and one reason a human should check its output.</p>'},
 animation:{title:'AI Animation Studio',desc:'Mission 001: Invent a character.',content:'<p><b>Concept:</b> Strong animation starts with a clear character goal.</p><p>Challenge: invent a hero, define what they want, and write one sentence describing the problem they face.</p>'}
};
let state = JSON.parse(localStorage.getItem('sma-demo-state') || '{"started":[],"completed":[],"xp":0,"quiz":false}');
let activeCourse = null;
function save(){localStorage.setItem('sma-demo-state',JSON.stringify(state));renderProgress()}
function renderProgress(){
 const keys=Object.keys(courses);
 keys.forEach(k=>{const done=state.completed.includes(k)?100:(state.started.includes(k)?20:0);const bar=document.getElementById('prog-'+k);const label=document.getElementById('label-'+k);if(bar)bar.style.width=done+'%';if(label)label.textContent=done===100?'Completed ✓':done===20?'In progress':'0% completed'});
 document.getElementById('stat-lessons').textContent=state.started.length;
 document.getElementById('stat-points').textContent=state.xp+' XP';
 document.getElementById('overall-label').textContent=Math.round(state.completed.length/keys.length*100)+'%';
 document.getElementById('overall-progress').style.width=(state.completed.length/keys.length*100)+'%';
}
function startLesson(key){
 activeCourse=key;if(!state.started.includes(key))state.started.push(key);
 const c=courses[key];document.getElementById('modal-title').textContent=c.title;document.getElementById('modal-text').textContent=c.desc;document.getElementById('lesson-content').innerHTML=c.content;
 const btn=document.getElementById('completeBtn');btn.disabled=state.completed.includes(key);btn.textContent=state.completed.includes(key)?'Lesson completed ✓':'Mark lesson complete +20 XP';
 btn.style.opacity=btn.disabled?'.6':'1';document.getElementById('modal').style.display='grid';save();
}
function completeLesson(){if(!activeCourse||state.completed.includes(activeCourse))return;state.completed.push(activeCourse);state.xp+=20;save();document.getElementById('completeBtn').disabled=true;document.getElementById('completeBtn').textContent='Lesson completed ✓';document.getElementById('completeBtn').style.opacity='.6'}
function closeModal(){document.getElementById('modal').style.display='none'}
function showInfo(title,desc){activeCourse=null;document.getElementById('modal-title').textContent=title;document.getElementById('modal-text').textContent=desc;document.getElementById('lesson-content').innerHTML='<p>This is a starter activity. The full AI tools and guided content can be added in a future version.</p>';document.getElementById('completeBtn').style.display='none';document.getElementById('modal').style.display='grid'}
function runCode(){const code=document.getElementById('code').value;document.getElementById('preview').srcdoc=code}
function resetCode(){document.getElementById('code').value=initialCode;runCode()}
function resetProgress(){if(confirm('Reset your demo learning progress on this device?')){state={started:[],completed:[],xp:0,quiz:false};save();document.getElementById('quiz-result').textContent=''}}
function answerQuiz(button,correct){const result=document.getElementById('quiz-result');if(state.quiz){result.textContent='Challenge already completed. Keep learning!';return}if(correct){state.quiz=true;state.xp+=10;save();result.textContent='Correct! +10 XP — HTML structures webpage content. 🚀';button.style.borderColor='var(--green)'}else{result.textContent='Not quite. Hint: HTML gives a webpage its structure.'}}
document.getElementById('menuBtn').addEventListener('click',()=>document.getElementById('navlinks').classList.toggle('open'));
document.querySelectorAll('#navlinks a').forEach(a=>a.addEventListener('click',()=>document.getElementById('navlinks').classList.remove('open')));
document.getElementById('modal').addEventListener('click',e=>{if(e.target.id==='modal')closeModal()});
document.getElementById('year').textContent=new Date().getFullYear();runCode();renderProgress();
