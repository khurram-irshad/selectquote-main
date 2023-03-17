var client = new AddSearchClient('c1e022dad8a467ed86c42efec6120b63');
//client.setFuzzyMatch(false);

var conf = {
  matchAllQuery: true
};

var searchui = new AddSearchUI(client);

var searchResultsTemplate = `
  <div class="addsearch-searchresults">    
    {{#if resultcount}}
      <div class="addsearch-results-count">{{> numberOfResultsTemplate }} for<span class="keyword"><em>{{keyword}}</em></span></div>
    {{/if}}
     <div class="hit-wrapper">
    {{#each hits}}
     <div class="hit">
     <div class="hit-inner-wrapper">
        <div class="hit-top">         
          <div class="highlight">
            <span class="main-image {{document_type}} {{#unless images.main}}noimage{{/unless}}"{{#if images.main}} style="background-image: url(data:image/jpeg;base64,{{images.main_b64}})"{{/if}}>
              {{#if images.main}}<img src="{{images.main}}" alt="{{title}}" />
              {{else if style.image_url}}<img src="{{style.image_url}}" alt="{{title}}" />{{/if}}    
            </span>          
           </div>
          
        </div>
        <div class="hit-bottom">
          <h3> 
              <a href="{{url}}" data-analytics-click="{{id}}">{{title}}</a>
            </h3>
        <div class="highlight">       
        <a href="{{url}}" data-analytics-click="{{id}}">{{highlight}}</a>
        </div>               
        </div>
        </div>
      </div>
    {{/each}}
    </div>
  </div>
`;

var FILTERS_SELECTLIST_TEMPLATE = `
  <div class="addsearch-filters-selectlist custom-select">
    <select>
      {{#each options}}
        <option value="{{@key}}" {{#if active}}selected{{/if}}>{{label}}</option>
      {{/each}}
    </select>
  </div>
`;

// Add components
searchui.searchField({
  containerId: 'searchfield-container',
  placeholder: 'Keyword..',
  searchAsYouType: true,
  icon: 'false',
  autofocus: false
});

searchui.autocomplete({
  containerId: 'autocomplete-container',
  sources: [
    {
      type: AddSearchUI.AUTOCOMPLETE_TYPE.SUGGESTIONS
    }
  ],
  hideAutomatically: true
});

searchui.filters({
  containerId: 'tabs',
  type: AddSearchUI.FILTER_TYPE.SELECT_LIST,
  clearOtherFilters: true,
  template: FILTERS_SELECTLIST_TEMPLATE,
  setSorting: {
    field: 'relevance',
    order: 'desc'
  },
  options: {
    nofilter: {
      label: 'All results'
    },
    life: {
      label: 'Life',
      filter: {'category': '0xlife.selectquote.com'}
    },
    autoHome: {
      label: 'Auto & Home',
      filter: {'category': '0xhomeandauto.selectquote.com'}
    },
    medicare: {
      label: 'Medicare',
      filter: {'category': '0xmedicare.selectquote.com'}
    }
  }
});

searchui.searchResults({
  containerId: 'searchresults-container',
  template: searchResultsTemplate
});

searchui.loadMore({
  containerId: 'loadmore',
  type: AddSearchUI.LOAD_MORE_TYPE.INFINITE_SCROLL,
  infiniteScrollElement: document.querySelector('#searchresults-container')
});



// All components added. Start
searchui.start();

// Toggle overlay for demo

function toggleClass(element, className){
  if (!element || !className){
    return;
  }
  var classString = element.className, nameIndex = classString.indexOf(className);
  if (nameIndex === -1) {
    classString += ' ' + className;
  }
  else {
    classString = classString.substr(0, nameIndex) + classString.substr(nameIndex+className.length);
  }
  element.className = classString;
}

// document.getElementById('toggle-desktop').addEventListener('click', function() {
//   toggleClass(document.getElementById('overlay'), 'open');
//   window.localStorage.setItem('searchOverlay', 'opened');
// });
// document.getElementById('toggle-mobile').addEventListener('click', function() {
//   toggleClass(document.getElementById('overlay'), 'open');
//   window.localStorage.setItem('searchOverlay', 'opened');
// });
// document.getElementById('close').addEventListener('click', function() {
//   toggleClass(document.getElementById('overlay'), 'open');
//   window.localStorage.setItem('searchOverlay', 'closed');
// });

// open overlay if there is keyword in search input field
if (new URL(document.URL).searchParams.get('search') && window.localStorage.getItem('searchOverlay') === 'opened') {
  toggleClass(document.getElementById('overlay'), 'open');
}

// custom drop down list
var x, i, j, l, ll, selElmnt, a, b, c, p, k;
p = document.getElementById('tabs');
k = document.getElementById('select-list');
/* Look for any elements with the class "custom-select": */
x = document.getElementsByClassName("custom-select");
l = x.length;

selElmnt = p.getElementsByTagName("select")[0];
ll = selElmnt.length;
/* For each element, create a new DIV that will act as the selected item: */
a = document.createElement("DIV");
a.setAttribute("class", "select-selected");
a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
k.appendChild(a);
/* For each element, create a new DIV that will contain the option list: */
b = document.createElement("DIV");
b.setAttribute("class", "select-items select-hide");
for (j = 0; j < ll; j++) {
  /* For each option in the original select element,
  create a new DIV that will act as an option item: */
  c = document.createElement("DIV");
  c.innerHTML = selElmnt.options[j].innerHTML;
  c.addEventListener("click", function(e) {
    /* When an item is clicked, update the original select box,
    and the selected item: */
    var y, i, k, s, h, sl, yl;
    // s = this.parentNode.parentNode.getElementsByTagName("select")[0];
    s = p.getElementsByTagName("select")[0];
    sl = s.length;
    h = this.parentNode.previousSibling;
    for (i = 0; i < sl; i++) {
      if (s.options[i].innerHTML == this.innerHTML) {
        s.selectedIndex = i;
        h.innerHTML = this.innerHTML;
        y = this.parentNode.getElementsByClassName("same-as-selected");
        yl = y.length;
        for (k = 0; k < yl; k++) {
          y[k].removeAttribute("class");
        }
        this.setAttribute("class", "same-as-selected");
        s.dispatchEvent(new Event('change'));
        break;
      }
    }
    h.click();
  });
  b.appendChild(c);
}
k.appendChild(b);
a.addEventListener("click", function(e) {
  /* When the select box is clicked, close any other select boxes,
  and open/close the current select box: */
  e.stopPropagation();
  closeAllSelect(this);
  this.nextSibling.classList.toggle("select-hide");
  this.classList.toggle("select-arrow-active");
});

function closeAllSelect(elmnt) {
  /* A function that will close all select boxes in the document,
  except the current select box: */
  var x, y, i, xl, yl, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}

/* If the user clicks anywhere outside the select box,
then close all select boxes: */
document.addEventListener("click", closeAllSelect);

