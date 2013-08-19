# Click to Dial
Click to dial was not an available feature in the out of the box implementation of Microsoft 
Dynamics CRM 2011. Luckily the latest system has made it a lot easier to manipulate the entity 
forms through the use of web resources. In this example you will create three such web resources 
in order to have the JavaScript search the content of the form for input fields that contain the 
word “phone” in the ID. Once found, the JavaScript will modify the DOM to append a click to dial 
button to the end of the input field if there is content within the field.
## Requirements
* 3.0 SU11 or 4.0 Interaction Client installed on the machine.
* Resources located in github at https://github.com/InteractiveIntelligence/MSCRM-Customization-Snippets/tree/master/ClickToDial .
* Administrator rights to customize Microsoft Dynamics CRM 2011.

## Creating Web Resources
The first step in implementing the click to dial feature is to create the necessary web resources to 
append a button to the end of a phone number input field.

1. Log into the Microsoft Dynamics CRM with an administrative account.
![dynamics crm](https://github.com/InteractiveIntelligence/MSCRM-Customization-Snippets/blob/master/ClickToDial/doc/DynamicsCRM.png?raw=true)

2. From the navigation bar on the left, click on the Settings category on the bottom portion 
of the pane.  This will change the selection content above.
3. With the new selection content in the navigation bar, select Customizations.  This will change the main area to display the types of customizations.
![dynamics crm](https://github.com/InteractiveIntelligence/MSCRM-Customization-Snippets/blob/master/ClickToDial/doc/Customizations.png?raw=true)

4. From the main area, click on the “Customize the System”.  This will open up a new window.
5. From the navigation bar on the left on the new window, select Web Resources.  The screen should look like the one below.
![dynamics crm](https://github.com/InteractiveIntelligence/MSCRM-Customization-Snippets/blob/master/ClickToDial/doc/WebResources.png?raw=true)

6. Click on the “New” button in the menu.
7. Fill out the fields as shown in the following screen shot.
![dynamics crm](https://github.com/InteractiveIntelligence/MSCRM-Customization-Snippets/blob/master/ClickToDial/doc/NewFields.png?raw=true)

8. Click on the browse button to select the image file that will be used for the standard click 
to dial button.
9. Repeat steps 6 thru 8 to add in a second image that will be the image used when the 
mouse is hovering over the button. The name should be “ActivePhoneCall”.
10. Add one more web resource. This time it is going to be a JavaScript file with the name 
ClickToDial.
![dynamics crm](https://github.com/InteractiveIntelligence/MSCRM-Customization-Snippets/blob/master/ClickToDial/doc/JavascriptResource.png?raw=true)

11. Click on the browse button to select the JavaScript file to import.  Once imported, you can click on the “Text Editor” button to make modifications to the script as needed.

## Setting the Entity Page Events
The second part of setting up the click to dial is to modify the entity page and field settings to utilize 
the web resource created in previous section. Below is a list of steps to accomplish this for the entity 
type “Contact”. By performing the following steps, this will execute the JavaScript web resource when 
the page is first loaded on the agent’s desktop. The script will search the form for any input field that 
has the word “phone” in the ID. If one is found, then it will check to see if there is any content within 
the input field. If all these conditions are met, then the script will modify the DOM to append the click 
to dial button to the end of the input field.

1. If the windows from the previous section have been closed, then perform steps 1 thru 4 
from the previous section to get to the Customize the System window.
2. In the navigation bar on the left, expand the item “Entities” by clicking the arrow to the 
left of the word.
![dynamics crm](https://github.com/InteractiveIntelligence/MSCRM-Customization-Snippets/blob/master/ClickToDial/doc/Entities.png?raw=true)

3. Expand the entity item “Contact” and click on forms.  By default there should be two forms available here. We are going to focus on the Main form.
![dynamics crm](https://github.com/InteractiveIntelligence/MSCRM-Customization-Snippets/blob/master/ClickToDial/doc/ContactForms.png?raw=true)

4. Double click on the main form to open the form editor.
![dynamics crm](https://github.com/InteractiveIntelligence/MSCRM-Customization-Snippets/blob/master/ClickToDial/doc/ContactFormEditor.png?raw=true)

5. Click on the “Form Properties” located on the ribbon at the top of the window.  Make sure that the tab “Events” is selected.
![dynamics crm](https://github.com/InteractiveIntelligence/MSCRM-Customization-Snippets/blob/master/ClickToDial/doc/FormProperties.png?raw=true)

6. Click on the add button from the form libraries and select the web resource ClickToDial 
that was created in the first section.
7. Click on the OK button.
![dynamics crm](https://github.com/InteractiveIntelligence/MSCRM-Customization-Snippets/blob/master/ClickToDial/doc/LookUpRecord.png?raw=true)

8. Scroll down for form properties to the event handlers section.
9. Click on the “Add” button and select the “ClickToDial” library.
10. Set the function name as “pageLoaded”.
11. Make sure that the enabled checkbox is checked.
12. Make sure that the checkbox “Pass execution context as first parameter” is also checked.
![dynamics crm](https://github.com/InteractiveIntelligence/MSCRM-Customization-Snippets/blob/master/ClickToDial/doc/HandlerProperties.png?raw=true)

13. Click the OK button on the handler properties and again on the form properties to close 
the dialog boxes.
14. Repeat above steps for every entity form that you wish to apply the click to dial to.

## Setting the Entity Page Field Events
The final part of setting up the click to dial is to modify the entity page field settings to utilize the web 
resource created in first section. This will allow for the click to dial button to appear and disappear as 
the content of the phone number input field is changed.

1. Open up the form editor for the contact main form. Refer to steps 1 thru 4 in the previous section.
2. Click on a phone number field on the form to select it.
3. Then click on the “Change Properties” button on the ribbon bar at the top of the window.
4. Select the “Event” tab.  Since the JavaScript web resource has already been added to the form from the 
previous section, there is no need to do it again here.
5. Scroll to the “Event Handlers” section.
![dynamics crm](https://github.com/InteractiveIntelligence/MSCRM-Customization-Snippets/blob/master/ClickToDial/doc/FieldProperties.png?raw=true)

6. Make sure that the Event dropdown box has the event “OnChange” selected.
7. Click on the “Add” button and select the “ClickToDial” library.
8. Set the function name as “phoneNumberChanged”.
9. Make sure that the enabled checkbox is checked.
10. Make sure that the checkbox “Pass execution context as first parameter” is also checked.
![dynamics crm](https://github.com/InteractiveIntelligence/MSCRM-Customization-Snippets/blob/master/ClickToDial/doc/HandlerPropertiesNumberChanged.png?raw=true)

11. Click the OK button on the handler properties and again on the form properties to close 
the dialog boxes.
12. Repeat above steps for every phone number field that you wish to apply the click to dial 
to.

## Final Results
Once the above procedures are completed and everything set up correctly, open up an existing 
contact record on the Microsoft Dynamics CRM web client and final result should look something like 
this. Notice the area within the red circle
![dynamics crm](https://github.com/InteractiveIntelligence/MSCRM-Customization-Snippets/blob/master/ClickToDial/doc/FinalResults.png?raw=true)
