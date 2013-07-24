function pageLoaded(context)
{
    try
    {
        updatePagePhoneNumberInputs();
    } catch(e) {alert("Error on page loaded event: " + e.message);}
}

function updatePagePhoneNumberInputs()
{
    // Get all the input items from the parent document
    var inputElementArray = document.getElementsByTagName('input');

    // Loop through all the input fields
    for (var index = 0; index < inputElementArray.length; index++) 
    {
        // Check to see if it is a valid field
        if (isPhoneInput(inputElementArray[index]) && hasPhoneNumber(inputElementArray[index]))
        {
            // Update the DOM to insert a click to call link icon.
            addCallTo(inputElementArray[index]);
        }
    }
}

function isPhoneInput(inputElement)
{
    // Check to see if the element object is null
    if (inputElement == null)
        return false;

    // Create regular expression for the input type
    var elementTypeRegExpr = new RegExp('text', 'ig');

    // Create regular expression for the phone
    var phoneRegExpr = new RegExp('phone', 'ig');
   
    // Check to see if the input is of type "text"
    var elementTypeFound = inputElement.getAttribute('type').search(elementTypeRegExpr) != -1;

    // Check to see if the input's ID contains the work "phone"
    var isPhoneNumberElement = inputElement.getAttribute('id').search(phoneRegExpr) != -1;

    // Return results
    return elementTypeFound && isPhoneNumberElement;
}

function hasPhoneNumber(inputElement)
{
    if (inputElement == null)
        return false;

    return inputElement.getAttribute("value").length > 0;
}

function phoneNumberChanged(context)
{
    if (context == null)
        return;
 
    try
    {
        // Get the event source
        var eventSource = context.getEventSource();

        // Get the DOM element
        var inputElementId = eventSource.getName();
        var inputElement = document.getElementById(inputElementId);
        var parentAttributeName = 'inin_parent_' + inputElementId;

        if (inputElement.getAttribute(parentAttributeName) == null)
        {
            if (hasPhoneNumber(inputElement))
                addCallTo(inputElement);
        }
        else 
        {
            if (!hasPhoneNumber(inputElement))
                removeCallTo(inputElement);
        }
        
    } catch(e) {alert("Error on phone number changed event: " + e.message);}
}

function addCallTo(inputElement)
{
    if (inputElement == null)
        return;

    var parentElement = inputElement.parentNode;
    var inputElementId = inputElement.getAttribute('id');
    
    var parentAttributeName = 'inin_parent_' + inputElementId;
    inputElement.setAttribute(parentAttributeName, parentElement.getAttribute('id'));

    // Remove the child from the parent
    parentElement.removeChild(inputElement);

    // Lets create the new table node that we are going to put into place.    
    parentElement.appendChild(createTableElement(inputElement));
}

function removeCallTo(inputElement)
{
    if (inputElement == null)
        return;

    // Get the DOM element
    var inputElementId = inputElement.getAttribute('id');

    var parentAttributeName = 'inin_parent_' + inputElementId;
    var parentElementName = inputElement.getAttribute(parentAttributeName);
    
    if (parentElementName.length > 0)
    {
        var parentElement = document.getElementById(parentElementName);
        
        // Remove the first child
        parentElement.removeChild(parentElement.childNodes[0]);
        
        // Add the input element
        parentElement.appendChild(inputElement);
        
        // Remove the custom attribute
        inputElement.removeAttribute(parentAttributeName);
    }
}

function clickToDialImg_OnMouseOver()
{
    try
    {
        this.setAttribute('src', '/WebResources/new_ActivePhoneCall');
    } catch(e) {alert("There was a problem handling the on mouse over event: " + e.message);}
}

function clickToDialImg_OnMouseOut()
{
    try
    {
        this.setAttribute('src', '/WebResources/new_InactivePhoneCall');
    } catch(e) {alert("There was a problem handling the on mouse out event: " + e.message);}
}

function clickToDialImg_OnClick()
{
    try
    {
        var id = this.getAttribute('id');
        var inputElementId = id.substr(12);

        var phoneNumber = document.getElementById(inputElementId).getAttribute('value');

        if (confirm('Do you wish to dial the number ' + phoneNumber + '?'))
        {
            window.top.location.href = 'callto:' + phoneNumber;
        }
    } catch(e) {alert("There was a problem handling the image click event: " + e.message);}
}

function createTableElement(inputElement)
{
    if (inputElement == null)
        return null;

    // OK, this is going to be a table element so let's start with that
    var tableElement =  document.createElement('table');
    var inputElementId = inputElement.getAttribute('id');

    // Set the attributes on the table
    tableElement.setAttribute('cellPadding', '0');
    tableElement.setAttribute('cellSpacing', '0');
    tableElement.setAttribute('width', '100%');
    tableElement.setAttribute('id', 'inin_table_' + inputElementId);
    tableElement.appendChild(createTableBody(inputElement));

    return tableElement;
}

function createTableBody(inputElement)
{
    if (inputElement == null)
        return null;

    // Create and append the table body
    var tableBody =  document.createElement('tbody');
    var inputElementId = inputElement.getAttribute('id');
    tableBody.setAttribute('id', 'inin_tbody_' + inputElementId);
    tableBody.appendChild(createTableRow(inputElement));
    return tableBody;
}

function createTableRow(inputElement)
{
    if (inputElement == null)
        return null;

    // Create and append the table row
    var tableRow =  document.createElement('tr');
    var inputElementId = inputElement.getAttribute('id');
    tableRow.setAttribute('id', 'inin_tr_' + inputElementId);
    tableRow.appendChild(createPhoneNumberColumn(inputElement));
    tableRow.appendChild(createClickToDialColumn(inputElement));

    return tableRow;
}

function createPhoneNumberColumn(inputElement)
{
    if (inputElement == null)
        return null;

    // First column id going to be the input field
    var phoneNumberColumn =  document.createElement('td');
    var inputElementId = inputElement.getAttribute('id');
    phoneNumberColumn.setAttribute('id', 'inin_td_' + inputElementId);
    phoneNumberColumn.appendChild(inputElement);
    return phoneNumberColumn;
}

function createClickToDialColumn(inputElement)
{
    if (inputElement == null)
        return null;

    // Second column will be the new click to dial icon
    var clickToDialColumn =  document.createElement('td');
    clickToDialColumn.setAttribute('id', 'inin_td_clicktodial');
    clickToDialColumn.setAttribute('width', '25px');
    clickToDialColumn.appendChild(createDialImage(inputElement));
    return clickToDialColumn;
}

function createDialImage(inputElement)
{
    if (inputElement == null)
        return null;
    
    // Create the image that we wint the user to click
    var image = document.createElement('img');
    var inputElementId = inputElement.getAttribute('id');
    var imageId = 'clickToDial_' + inputElementId
    image.setAttribute('id', imageId);

    // Set the image's attributes.
    image.setAttribute('class', 'clickToDial');
    image.setAttribute('src', '/WebResources/new_InactivePhoneCall');
    image.setAttribute('title', 'Click to dial phone number.');
    image.setAttribute('alt', 'Click to dial phone number.');
    image.setAttribute('width', '21px');
    image.setAttribute('height', '20px');
    image.setAttribute('cursor', 'hand');

    // set the events
    image.onmouseover = clickToDialImg_OnMouseOver;
    image.onmouseout = clickToDialImg_OnMouseOut;
    image.onclick = clickToDialImg_OnClick;

    return image;
}