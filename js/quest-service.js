const KEY = 'TreeDB';
var gQuestsTree;
var gCurrQuest;
var gPrevQuest = null;

function createQuestsTree() {
    var questsTree = getFromStorage(KEY);
    if (!questsTree) {
        questsTree = createQuest('Male?');
        questsTree.yes = createQuest('Gandhi');
        questsTree.no = createQuest('Rita');
    }
    gQuestsTree = questsTree;
    gCurrQuest = gQuestsTree;
    gPrevQuest = null;
    _saveTreeToStorage();
}

function createQuest(txt) {
    return {
        txt: txt,
        yes: null,
        no: null
    }
}

function isChildless(node) {
    return (node.yes === null || node.no === null)
}

function moveToNextQuest(res) {
    // update the gPrevQuest, gCurrQuest global vars
    gPrevQuest = gCurrQuest;
    gCurrQuest = gCurrQuest[res];
    // gCurrQuest = (res === 'yes') ? gPrevQuest.yes : gPrevQuest.no;
}

function addGuess(newQuestTxt, newGuessTxt, lastRes) {
    var newQuest = createQuest(newQuestTxt);
    newQuest.yes = createQuest(newGuessTxt);
    newQuest.no = gPrevQuest[lastRes];
    gPrevQuest[lastRes] = newQuest;
    _saveTreeToStorage();
}

function getCurrQuest() {
    return gCurrQuest;
}

function _saveTreeToStorage() {
    saveToStorage(KEY, gQuestsTree);
}