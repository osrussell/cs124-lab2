# Design Document

## Initial ideas
Our design started as a a box within the screen you could slide up and down as needed to view the list items  (scroll wheel). 

Then we added buttons below to do the various actions. Specifically the notebook items could be individually selected (shown with highlight) and then the buttons would act on them. We chose 

![first draft](notebook1.png)

## Improvements 

Then we started to refine those ideas with physicality and mobile design preferences. Changed the "rename" button into double tapping the names (might need a note to explain it but seems intuitive/conceptually prevalent in mobile design). We also designed the "highlighting" would be connected to a check box and this would be "complete" or not. Moved the new item section to underneath the last item of the list as a plus button. 
We chose to keep delete and show all completed items as seperate buttons to clearly show their intent. If we include an individual delete system it would be a trash can hidden behind a lock (ie only visible when a lock button is pressed)

![second draft](notebook2.png)

We added some visual additions by making the scroll box on a notebook image (but without ruled lines so we dont have to line it up)


## Design implementation for Lab 2 

![lab2version](Checklistversion2.png)

Most of the initial design stayed the same. There was some aesthetic changes (such as with add
item) but the actual function and layout was not. 

The biggest change was the addition of the Lock system for the trash button. In order to prevent accidental 
trashing of selected items, we added a Lock button. Before unlock is selected (marked by a U), the trash button 
is grayed out and does not work. Once clicked, the trash button is then usable. If necessary you 
can relock the trash icon by pressing the lock button (marked by a L). We wanted some better images or text 
to display intent but that is a change for another day (due to time constraits)

As for challenges we faced. There was some issues with making the tasks editable once sent. 
Eventually we managed to ditch the Input unit and just made a "contentedible" div. This works for now 
but may have trouble saving data later. We also struggled making a popup for the trash button that in no way
influenced our choice to make a lock button. 

## User Testing for Lab 2
(note this was before the lock was added)

USER TESTING with Zoe Kedzierski, completed 3/3/2022 after most Javascript features were implemented, but prior to the lock button being added

Q: What is your first impression of what this app is?

A: It looks like the Reminders app. Based on the title it’s a checklist to keep track of whatever tasks you have.

--

Q: Can you try adding an item?

A: I feel like I would click the text prompt and then click add.

User added ‘text olivia’ to list

(This was correct, so it was a good sign for our app)

(As a side note, User seemed to intuitively check off items to be done with the checkbox, as well as edit items)

--

Q: Can you now try deleting an item?

A: I think I would try checking off an item maybe? And then hitting trash?

User checked off an item and then tried hitting Trash. This did not work, so they instead tried Hide, which hid the item and didn’t delete it.

--

Q: What do you now think show does?

A: I think it would show the item I just hid

User then unhid the items.

User continued to seem confused about how to delete an item until the highlighting was pointed out.

--

Q: Can you now try to delete multiple items?

User deleted multiple items

(They still weren’t able to figure it out on their own very quickly though)

--

Q: Do you have any closing thoughts about your experience?

A: I was not ready for there to be multiple ways to select. It threw me off my game and made things more confusing.

(We should likely find a new and more intuitive way to delete tasks in future versions of the app, as the highlighting and checking off seem to be confusing.
Also, upon reflecting on this user testing, the lock button might make this even more confusing, which we will also reconsider in our next implementation)

## Adjustments for Larger Screen Sizes

We slightly adjusted our design for larger screens by making the notebook background expand or contract based on screen size. We also added the ability for the user to make different lists, and this was put in a menu at the top, accessible by hamburger button. Our initial plan for the expanding screen size is shown below.

![Plan for wider screens](notebook3.png)

We also added accessibility changes, including tab functionality and a 'Big Text' mode in the hamburger menu. 

Also, in response to the editing / selecting being confusing based on user testing for Lab 2, we created a button that allows users to edit tasks so that selecting was more clear. We also changed the lock botton for deleting to an icon of a lock to make it's purpose more obvious.

## User texting for Lab 4