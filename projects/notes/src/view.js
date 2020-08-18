class NoteListView {
  nodeList = [];
  /**
   *
   * @param {HTMLElement} selector - Html element where to display the notes.
   */
  constructor(selector) {
    this.viewElement = document.createElement("ol");
    document.querySelector(selector).appendChild(this.viewElement);
    const nodeDeleted = function (event) {
      this.viewElement.removeChild(event.detail.nodeToDelete.element);
      this.nodeList.splice(this.nodeList.indexOf(event.detail.nodeToDelete), 1);
      event.stopPropagation();
    };

    this.viewElement.addEventListener("nodedelete", nodeDeleted.bind(this));
  }

  /**
   *Create a basic valid note node object.
   */
  static noteNodeFact = (content) => {
    let note = {
      content: content,
      contentElem: document.createElement("span"),
      element: document.createElement("li"),
      deleteButtonElem: document.createElement("button"),
    };
    note.element.appendChild(note.contentElem);
    note.element.appendChild(note.deleteButtonElem);
    note.contentElem.innerHTML = note.content;
    note.deleteButtonElem.innerHTML = "Delete note";
    let eventTrigger = function (event) {
      let deleteClicked = new CustomEvent("nodedelete", {
        bubbles: true,
        detail: { nodeToDelete: this },
      });
      this.element.dispatchEvent(deleteClicked);
    };
    let buttonDeleteEvent = eventTrigger.bind(note);
    note.deleteButtonElem.addEventListener("click", buttonDeleteEvent);
    return note;
  };
  /**
   *Add a note node to the list of nodes.
   * @param {*} node - Object containing a 'content' attribute which will represent the node value.
   */
  addNode(node) {
    let newNode = node;
    this.nodeList.push(newNode);
    this.viewElement.insertBefore(newNode.element, this.viewElement.firstChild);
  }
  /**
   * Return the contained note nodes.
   */
  getNotes() {
    return this.nodeList;
  }
}

export default {
  NoteListView,
};
