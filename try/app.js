const box = document.getElementById('input');
const btn = document.getElementById('submitBtn');

btn.addEventListener('click', () => {
console.log('hello');
    let new_data = box.value;
    if(localStorage.getItem('data') == null) {
        localStorage.setItem('data', '[]');
    }
    let old_data = JSON.parse(localStorage.getItem('data'));
    old_data.push(new_data);
    localStorage.setItem('data', JSON.stringify(old_data));
}); 