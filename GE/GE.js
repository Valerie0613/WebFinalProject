// 獲取 DOM 元素
const form = document.getElementById('form');
const list = document.getElementById('list');
const textInput = document.getElementById('text');

// 從本地存儲中加載留言
document.addEventListener('DOMContentLoaded', loadMessages);

// 監聽表單提交事件
form.addEventListener('submit', function(e) {
    e.preventDefault(); // 防止表單提交刷新頁面

    // 獲取輸入的留言文本
    const message = textInput.value.trim();

    // 檢查留言是否為空
    if (message === '') {
        alert('Please enter a message');
        return;
    }

    // 創建新的留言項目
    const li = document.createElement('li');
    li.textContent = message;
    li.classList.add('new-message'); // 添加新留言的特效類

    // 創建刪除按鈕
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    li.appendChild(deleteBtn);

    // 將新的留言項目添加到列表中
    list.appendChild(li);

    // 保存留言到本地存儲
    saveMessageToLocalStorage(message);

    // 清空輸入框
    textInput.value = '';

    // 移除特效類，防止重複觸發
    setTimeout(() => {
        li.classList.remove('new-message');
    }, 500);
});

// 保存留言到本地存儲
function saveMessageToLocalStorage(message) {
    let messages;
    if (localStorage.getItem('messages') === null) {
        messages = [];
    } else {
        messages = JSON.parse(localStorage.getItem('messages'));
    }
    messages.push(message);
    localStorage.setItem('messages', JSON.stringify(messages));
}

// 從本地存儲中加載留言
function loadMessages() {
    let messages;
    if (localStorage.getItem('messages') === null) {
        messages = [];
    } else {
        messages = JSON.parse(localStorage.getItem('messages'));
    }
    messages.forEach(function(message) {
        const li = document.createElement('li');
        li.textContent = message;

        // 創建刪除按鈕
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        li.appendChild(deleteBtn);

        list.appendChild(li);
    });
}

// 監聽刪除按鈕點擊事件
list.addEventListener('click', function(e) {
    if (e.target.classList.contains('delete-btn')) {
        const li = e.target.parentElement;
        const message = li.firstChild.textContent;

        // 添加滑走特效類
        li.classList.add('slide-out');

        // 等待動畫結束後從 DOM 中移除留言項目
        li.addEventListener('animationend', function() {
            // 從本地存儲中刪除留言
            deleteMessageFromLocalStorage(message);

            // 從 DOM 中刪除留言項目
            list.removeChild(li);
        });
    }
});

// 從本地存儲中刪除留言
function deleteMessageFromLocalStorage(message) {
    let messages;
    if (localStorage.getItem('messages') === null) {
        messages = [];
    } else {
        messages = JSON.parse(localStorage.getItem('messages'));
    }
    messages = messages.filter(function(m) {
        return m !== message;
    });
    localStorage.setItem('messages', JSON.stringify(messages));
}