import sys
from notebook import Notebook

class Menu:
    """Display a menu and respond to choises when run."""

    def __init__(self):
        self.notebook = Notebook()
        self.choises = {
            "1": self.show_notes,
            "2": self.search_notes,
            "3": self.add_note,
            "4": self.modify_note,
            "5": self.quit
        }
    
    def display_menu(self):
        print(
            """
            Notebook Menu

            1. Show All Notes 
            2. Search Notes 
            3. Add Note 
            4. Modify Note 
            5. Quit

            """
        )
    
    def run(self):
        """Display the menu and respond to choises. """
        while True:
            self.display_menu()
            choise = input("Enter a choise: ")
            action = self.choises.get(choise)
            if action:
                action()
            else:
                print("{0} is not a valid choise.".format(choise))
    
    def show_notes(self, notes = None):
        if not notes:
            notes = self.notebook.notes
        for note in notes:
            print("{0}: {1}\n{2}".format(note.id, note.tags, note.memo))
    
    def search_notes(self):
        filter = input("Search For: ")
        notes = self.notebook.search(filter)
        self.show_notes(notes)
    
    def add_note(self):
        memo = input("Enter a memo: ")
        self.notebook.new_note(memo)
        print("Your note has been added")
    
    def modify_note(self):
        id = input("Enter a note id: ")
        memo = input("Enter a memo: ")
        tags = input("Enter tags: ")
        if memo: 
            self.notebook.modify_memo(id, memo)
        if tags:
            self.notebook.modify_tags(id, tags)
    
    def quit(self):
        print("Exiting")
        sys.exit(0)

if __name__ == "__main__":
    Menu().run()
