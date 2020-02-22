const draggable_list = document.querySelector('#draggable-list')
const button = document.querySelector('#check')
const richestPeople = [
    'JavaScript',
    'HTML/CSS',
    'SQL',
    'Python',
    'Java',
    'Bash/Shell/PowerShell',
    'C#',
    'PHP',
    'C++',
    'TypeScript'
]

const listItems = []
let dragStartIndex
const draggable = new draggableAPI(draggable_list, dragStartIndex, listItems, richestPeople)

draggable.createListItems()
draggable.addEvent()

button.addEventListener('click', () =>{
    draggable.checkOrder()
})