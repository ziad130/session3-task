
// Step 1: Base Class - Person
class Person {
  #email;
  #ID;

  constructor(name, email, ID) {
    this.name = name;
    this.setEmail(email);
    this.setID(ID);
  }

  setEmail(email) {
    if (email.includes("@") && email.includes(".")) {
      this.#email = email;
    } else {
      throw new Error("Invalid email format.");
    }
  }

  getEmail() {
    return this.#email;
  }

  setID(ID) {
    if (Number.isInteger(ID) && ID > 0) {
      this.#ID = ID;
    } else {
      throw new Error("ID must be a positive integer.");
    }
  }

  getID() {
    return this.#ID;
  }

  describeRole() {
    throw new Error("Subclasses must implement describeRole()");
  }
}

// Step 2: Principal Class
class Principal extends Person {
  constructor(name, email, ID) {
    super(name, email, ID);
    this.members = [];
  }

  addMember(member) {
    this.members.push(member);
    console.log(`${member.name} added to the school.`);
  }

  removeMember(member) {
    const index = this.members.indexOf(member);
    if (index !== -1) {
      this.members.splice(index, 1);
      console.log(`${member.name} removed from the school.`);
    } else {
      console.log("Member not found.");
    }
  }

  listMembers() {
    console.log("School Members:");
    this.members.forEach(member => {
      console.log(`- ${member.name} (${member.constructor.name})`);
    });
  }

  describeRole() {
    return `Principal ${this.name} manages the school and its members.`;
  }
}

// Step 3: Teacher Class
class Teacher extends Person {
  constructor(name, email, ID, subject) {
    super(name, email, ID);
    this.subject = subject;
    this.gradedStudents = {};
  }

  gradeStudent(studentName, grade) {
    this.gradedStudents[studentName] = grade;
    console.log(`${studentName} graded ${grade} in ${this.subject}.`);
  }

  listGradedStudents() {
    console.log(`Graded Students by ${this.name}:`);
    for (const [student, grade] of Object.entries(this.gradedStudents)) {
      console.log(`- ${student}: ${grade}`);
    }
  }

  describeRole() {
    return `Teacher ${this.name} teaches ${this.subject}.`;
  }
}

// Step 4: Student Class
class Student extends Person {
  constructor(name, email, ID) {
    super(name, email, ID);
    this.subjects = [];
  }

  enroll(subject) {
    if (!this.subjects.includes(subject)) {
      this.subjects.push(subject);
      console.log(`${this.name} enrolled in ${subject}.`);
    } else {
      console.log(`${this.name} is already enrolled in ${subject}.`);
    }
  }

  viewSubjects() {
    console.log(`${this.name}'s Enrolled Subjects:`);
    this.subjects.forEach(subject => console.log(`- ${subject}`));
  }

  describeRole() {
    return `Student ${this.name} is enrolled in ${this.subjects.length} subjects.`;
  }
}

// Step 5: Simulate Actions
const principal = new Principal("Dr. Smith", "smith@school.edu", 1);
const teacher = new Teacher("Ms. Johnson", "johnson@school.edu", 2, "Mathematics");
const student = new Student("Alice", "alice@student.edu", 3);

// Principal adds members
principal.addMember(teacher);
principal.addMember(student);

// Teacher grades student
teacher.gradeStudent("Alice", 95);

// Student enrolls in subjects
student.enroll("Mathematics");
student.enroll("Science");

// List all members and describe roles
const allMembers = [principal, teacher, student];
console.log("\n--- Describing Roles ---");
allMembers.forEach(member => {
  console.log(member.describeRole());
});
