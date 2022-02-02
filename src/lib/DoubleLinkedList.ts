/**
 * Custom Double iterable linked list class
 */
export class DoubleLinkedList<T> {
  value: T;
  next: DoubleLinkedList<T> | null;
  previous: DoubleLinkedList<T> | null;

  /**
   *
   * @param value value to be stored in the node
   * @param next pointer to the next node
   * @param previous pointer to the previous node
   */
  constructor(
    value: T,
    next: DoubleLinkedList<T> | null = null,
    previous: DoubleLinkedList<T> | null = null
  ) {
    this.next = next;
    this.value = value;
    this.previous = previous;
  }

  /**
   * Remove self from list
   */
  remove(node: DoubleLinkedList<T>) {
    if (node.previous) node.previous.next = node.next;
    if (node.next) node.next.previous = node.previous;
  }

  /**
   * Add a node after linked list head
   *
   * @param value DoubleLinkedList
   * @returns reference to the node newly created
   */
  add(value: T): DoubleLinkedList<T> {
    let newList = new DoubleLinkedList(value, this.next, this);

    if (this.next !== null) this.next.previous = newList;
    this.next = newList;

    return newList;
  }

  /**
   * Returns the content of the linked list in array form
   *
   * NOTE: The linked list does not guaranty any order;
   *
   * @returns Array
   */
  toArray() {
    const result: T[] = [];
    for (const node of this) {
      const value = node.value;
      result.push(value);
    }
    return result;
  }

  *[Symbol.iterator]() {
    // yield the value in the head node
    yield this;

    // yield the values that follow the head node
    let head = this.next;
    while (head !== null) {
      yield head;
      head = head.next;
    }

    // yield the values before the head node
    head = this.previous;
    while (head !== null) {
      yield head;
      head = head.previous;
    }
  }

  public static fromArray<T>(node:T[]) {
    const head = new DoubleLinkedList(node[0]);
    
    let current = head;

    for (let index = 1; index < node.length; index ++ ){
      current.next = new DoubleLinkedList(node[index]);
      current = current.next;
    }

    return head;
  }
}
