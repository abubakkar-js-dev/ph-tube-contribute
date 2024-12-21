let fetchVideo = async function (url) {
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
     const response = await res.json();
     const all= response.data;
     const divPost =document.getElementById('divPost');
// console.log(all);
all.forEach(element => {
    console.log(element)
    const createNew = document.createElement('div');
    createNew.classList=(`flex gap-3`);
    createNew.innerHTML=`
     <button id="btnCat" class="px-4 py-2  flex gap-2 text-gray-700 bg-gray-200 rounded active:bg-red-300">
                ${element.category}
                </button>
                 <button class="px-4 py-2 flex gap-2 text-gray-700 bg-gray-200 rounded active:bg-red-300">
                ${element.category_id}
                </button>
                
    `;
    divPost.appendChild(createNew)
    // Add an event listener for the second button
    const btn = document.getElementById(`btnCat`);
    btn.addEventListener('click', () => {
       
        allID(`${element.category_id}`);
    });
   
});
  }

//   

 async function allID(id) 
 {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const response = await res.json();
    const get= response.data;
    // console.log(get)
    get.forEach(item => {
        console.log('item from id',item);
    });

  }
  
  fetchVideo();
  
  