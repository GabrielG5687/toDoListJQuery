
let tasks = [];
let editingId = null;
let deletingId = null;

function renderTasks() {
    const taskList = $('#taskList');
    taskList.empty();
    tasks.forEach(task => {
        const taskItem = $(`
            <div class="taskItem" data-id="${task.id}">
                <div class="taskTitle">${task.title}</div>
                <div class="taskDescription">${task.description}</div>
                <div class="taskActions">
                    <button class="editBtn">Editar</button>
                    <button class="deleteBtn">Excluir</button>
                </div>
            </div>
        `);
        taskList.append(taskItem);
    });
}

$('#addTask').click(() => {
    const title = $('#taskTitle').val();
    const description = $('#taskDesc').val();
    if (title.trim()) {
        const newTask = {
            id: Date.now(),
            title,
            description
        };
        tasks.push(newTask);
        renderTasks();
        $('#taskTitle').val('');
        $('#taskDesc').val('');
    }
});

$(document).on('click', '.editBtn', function () {
    const id = $(this).closest('.taskItem').data('id');
    const task = tasks.find(t => t.id === id);
    if (task) {
        editingId = id;
        $('#editTitle').val(task.title);
        $('#editDesc').val(task.description);
        $('#editModal').fadeIn();
    }
});

$('#cancelEdit').click(() => {
    $('#editModal').fadeOut();
});

$('#saveEdit').click(() => {
    const newTitle = $('#editTitle').val();
    const newDesc = $('#editDesc').val();
    const task = tasks.find(t => t.id === editingId);
    if (task) {
        task.title = newTitle;
        task.description = newDesc;
        renderTasks();
        $('#editModal').fadeOut();
    }
});

$(document).on('click', '.deleteBtn', function () {
    const id = $(this).closest('.taskItem').data('id');
    deletingId = id;
    $('#deleteModal').fadeIn();
});

$('#cancelDelete').click(() => {
    $('#deleteModal').fadeOut();
});

$('#confirmDelete').click(() => {
    tasks = tasks.filter(t => t.id !== deletingId);
    renderTasks();
    $('#deleteModal').fadeOut();
});