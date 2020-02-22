class draggableAPI{
    constructor(ul, dragStartIndex, listItems, richestPeople){
        this.ul = ul
        this.dragStartIndex = dragStartIndex
        this.listItems = listItems
        this.richestPeople = richestPeople
    }
    createListItems(){
         let newCopy = [...this.richestPeople]
        //  create new array using map method and create an object.
         newCopy.map(x =>{
             const object = {
                value: x,
                sort: Math.random()
             }
             return object
            //  sort the object using sort method. 
         }).sort((a, b) =>{
             return a.sort - b.sort
            //  use map method again to turn it back into an array of string. The object is now gone
         }).map(a => {
             return a.value
         })
        //  then use forEach to render content
         .forEach((technology, index) =>{
                const itemList = document.createElement('li')
                itemList.setAttribute('data-index', index)

                itemList.innerHTML = `
                    <span class="number">${index + 1}</span>
                    <div class="draggable" draggable="true">
                        <p class="technology">${technology}</p>
                        <i class="fas fa-grip-lines"></i>
                    </div>
                `
                this.listItems.push(itemList)
                this.ul.appendChild(itemList)
         })
    }
    // SWAP ITEMS
    swapItems(dragStartIndex, dragEndIndex){
        const itemOne = this.listItems[dragStartIndex].querySelector('.draggable')
        const itemTwo = this.listItems[dragEndIndex].querySelector('.draggable')
        this.listItems[dragStartIndex].appendChild(itemTwo)
        this.listItems[dragEndIndex].appendChild(itemOne)
        console.log(itemOne, dragStartIndex)
        console.log(itemTwo, dragEndIndex)
    }
    dragStart(draggable){
        console.log('Start')
        this.dragStartIndex = Number(draggable.closest('li').getAttribute('data-index'))
    }
    dragOver(e){
        e.preventDefault()
    }
    dragDrop(listItem){
        console.log('Drop')
        const dragEndIndex = Number(listItem.getAttribute('data-index'))
        listItem.classList.remove('over')
        this.swapItems(this.dragStartIndex, dragEndIndex)
    }
    dragEnter(listItem){
        console.log('Enter')
        listItem.classList.add('over')
        
    }
    dragLeave(listItem){
        console.log('Leave')
        listItem.classList.remove('over')
    }
    addEvent(){
        const draggables = document.querySelectorAll('.draggable')
        const dragListItems = document.querySelectorAll('.draggable-list li')
        draggables.forEach(draggable => {
            draggable.addEventListener('dragstart', () =>{
                this.dragStart(draggable)
            })
        })

        dragListItems.forEach(listItem => {
            listItem.addEventListener('dragover', (e) =>{
                this.dragOver(e)
            })
            listItem.addEventListener('drop', (e) =>{
                this.dragDrop(listItem, dragStartIndex)
            })
            listItem.addEventListener('dragenter', () =>{
                this.dragEnter(listItem)
            })
            listItem.addEventListener('dragleave', () =>{
                this.dragLeave(listItem)
            })
        })
    }

    // CHECK THE ORDER OF THE ITEMS
    checkOrder(){
        this.listItems.forEach((listItem, index) => {
            // const personName = listItem.querySelector('.draggable .person-name').innerText.trim()
            const technologies = listItem.querySelector('.draggable .technology').innerText

            if(technologies !== this.richestPeople[index]){
                listItem.classList.add('wrong')
            }else{
                listItem.classList.remove('wrong')
                listItem.classList.add('right')
            }
        })
    }
}