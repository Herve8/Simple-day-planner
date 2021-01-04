var hour = 9;
var minutes = ":00am";

var storedBlocks = [];
var arrayNAME = "Stored Blocks";

function setBGColor($div, currentTime, textTime)
{
    var timeCurrent = currentTime.split("");
    var initialTime = textTime.split("");

    if(timeCurrent[timeCurrent.length - 2] !== initialTime[initialTime.length - 2])
    {
        if(timeCurrent[timeCurrent.length - 2] > initialTime[initialTime.length - 2])
        {
            console.log("p > a");
            $div.addClass("bg-success");
        }
        else
        {
            console.log("p < a");
            $div.addClass("bg-primary");
        }
    }
    else
    {
        console.log("same time of day");
        $div.addClass("bg-danger");

        var time_CURRENT = parseHour(timeCurrent);
        var time_TXT = parseHour(initialTime);

        if(parseInt(time_CURRENT) > parseInt(time_TXT))
        {
            console.log("current greater");
            $div.addClass("bg-primary");
        }
        else if(parseInt(time_CURRENT) < parseInt(time_TXT))
        {
            if(parseInt(time_TXT) === 12)
            {
                console.log("current greater");
                $div.addClass("bg-primary");
            }
            else
            {
                console.log("current less");
                $div.addClass("bg-primary");
            }
        }
        else
        {
            $div.addClass("bg-primary");
        }
    }
}

function generateHourBlock(iterations)
{
    if(!iterations)
    {
        iterations = 1;
    }

    var currentTime = GetCurrentHour("LT");

    for(var i = 0; i < iterations; i++)
    {
        var text_time = hour + minutes;

        $iBlock = $("<div>").addClass("row py-1");
    
        $iTimeText = $("<h5>").addClass("text-center").text(text_time);
        $iTimeDiv = $("<div>").addClass("col-2 py-3 bg-primary align-middle").append($iTimeText);

        $iTextDiv = $("<textarea>").addClass("col-8 py-3 overflow-auto bg-primary").text("").attr("id", text_time);
        setBGColor($iTextDiv, currentTime, text_time);
    
        $iLockIcon = $("<span>").addClass("lock");

        $iLockDiv = $("<div>").addClass("col-1 py-3 lock-container border border-primary").append($iLockIcon);
        
        $iLockIcon.toggleClass('unlocked');
    
        $iBlock.append($iTimeDiv, $iTextDiv, $iLockDiv);
    
        $("#planner").append($iBlock);
    
        incrementTextHour();
    }

}

function incrementTextHour()
{
    if(hour === 12)
    {
        hour = 1;
    }
    else if(hour === 11)
    {
        text_Suffix = ":00pm";
        hour++;
    } else
    {
        hour++;
    }
}


function DisplayDate(pFormat)
{
    var date = moment().format(pFormat);

    $("#current-date").text(date);
}

function GetCurrentHour(pFormat)
{
    var time = moment().format(pFormat).toLowerCase();

    time = time.split("");

    var suffix = "";

    var hour = parseHour(time);

    console.log(hour);

    if(time[time.length - 2] === "p")
    {
        console.log("afternoon");
        suffix = ":00pm";
    }
    else
    {
        console.log("morning");
        suffix = ":00am";
    }

    console.log(hour + suffix);
    return hour + suffix;
}

function parseHour(pTime)
{
    var i = 0;
    var iHour = "";

    while(pTime[i] !== ":" || i > 100)
    {
        iHour += pTime[i];
        i++;
    }

    return iHour;
}

function taskStorage(pText, pID)
{
    nBlock = {
        id : pID,
        input : pText.trim()
    }

    for(var i = 0; i < storedBlocks.length; i++)
    {
        if(storedBlocks[i].id === nBlock.id)
        {
            storedBlocks.splice(i, 1);

            localStorage.setItem(storedBlocks_NAME, JSON.stringify(storedBlocks));

            return null;
        }
    }

    storedBlocks.push(nBlock);

    localStorage.setItem(arrayNAME, JSON.stringify(storedBlocks));
}


function timeStorageBlocks()
{

    if(localStorage.getItem(arrayNAME))
    {
        storedBlocks = JSON.parse(localStorage.getItem(arrayNAME));

        storedBlocks.forEach(iBlock => {
           
            iID = "#" + iBlock.id;

            $iBlock = $(document.getElementById(iBlock.id));

            $iBlock.val(iBlock.input);

            $iLock = $(($iBlock).parent().children().children()[1])
            
            $iLock.toggleClass("unlocked");

        });

    }

}

generateHourBlock(9);
DisplayDate("LLLL");
timeStorageBlocks();


$(".lock").click(function() {
    console.log("lock clicked");


    $(this).toggleClass('unlocked');

    $iTextArea = $($(this).parent().parent().children()[1]);

    iInput = $iTextArea.val();
    iID = $iTextArea.attr("id");

    taskStorage(iInput, iID);
  });
