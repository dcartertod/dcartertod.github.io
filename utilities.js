function showEl(el,bel,keepEl){
    //Array.from(document.getElementsByClassName('card')).forEach(el => el.classList.add('invisible'));
    Array.from(document.getElementsByClassName('card')).forEach(el => el.style.display='none');
    // document.getElementById(el).classList.remove('invisible');
    console.log(keepEl);
    if (keepEl != null){
      if (Array.isArray(keepEl)){
        keepEl.forEach(el => document.getElementById(el).style.display='block');
      }
      else{
        document.getElementById(keepEl).style.display='block';
      }
    }
    document.getElementById(el).style.display='block';
    //document.getElementById(el).classList.add('visible');


    // buttons
    if (bel != null){
      Array.from(document.getElementById(bel).parentElement.querySelectorAll('.btn')).forEach(el => el.classList.remove('active'));
      document.getElementById(bel).classList.add('active');
    }
  }

  function hideEl(el){
    //document.getElementById(el).classList.add('invisible');
    document.getElementById(el).style.display='none';
  }

  function showThisEl(el){
    document.getElementById(el).style.display='block';
  }

  function debug(msg){
    if (window.location.search.indexOf('debug')>-1){
      alert(msg);
    }
    else {
      console.log(msg);
    }
  }

  function addressChoice(){
    var reg = document.getElementById('addressq1s').value;

    if (reg >= 1){
      document.getElementById('addressq2s').selectedIndex=1;
      document.getElementById('addressq2s').disabled=true;
      document.getElementById('addressq2s').value = 0;
      showEl('addressq3');
    }
    else{
      document.getElementById('addressq2s').disabled=false;
    }

    var home = document.getElementById('addressq2s').value;
    var when = document.getElementById('addressq3s').value;

    debug("reg: " + reg);
    debug("home: " + home);
    debug("when: " + when);
    debug("display: " + document.getElementById('addressq3').style.display);

    if (document.getElementById('addressq3').style.display == 'none' || document.getElementById('addressq3').style.display == ''){
      when = -1;
      debug("when: " + when);
      document.getElementById('addressq3s').selectedIndex=0;
    }

    if (reg==0 && home==0){
      showEl('movedWithinPrecinct');
      hideEl('addressq3');
      return;
    }
    else if (reg==-1 || home == -1){
      hideEl('addressq3');
      document.getElementById('addressq3s').value = -1;
      when = -1;
      Array.from(document.getElementsByClassName('card')).forEach(el => el.style.display='none');
      return;
    }

    if ( home == 3){
      hideEl('addressq3');
      showEl('president1');
    }
    else{
      hideEl('president1');
      hideEl('president2');
    }


    // choose date
    // registered here; live somewhere else
    if (reg==0 && home > 0 && home != 3 && when==-1){
      showEl('addressq3');
      return;
    }

    // live here; registered somewhere else
    // bit redundant
    if (reg > 0 && home == 0 && when==-1){
      showEl('addressq3');
      //return;
    }


    // registered in this precinct
    if (reg == 0){
      // live in district NOT precinct
      if (home == 1){
        if (when == 0){
          showEl('movedFromHereRecently');
        }
        if (when == 1){
          showEl('movedFromHereNotRecently');
        }
        if (when == 2){
          showEl('provisional');
        }
      }
      // live in VA but different county/city/district
      if (home == 2){
        if (when == 0){
          showEl('movedFromHereRecently');
        }
        if (when >= 1){
          showEl('provisional');
        }
      }
    }

    // live in this precinct
    if (home == 0){
      // registered in same district NOT precinct
      if (reg == 1){
        // moved recently
        if (when==0){
          showEl('movedToHereRecently');
        }
        // moved fairly recently within district
        if (when==1){
          showEl('movedToHereNotRecently');
        }
        // moved a long time ago within district to this precinct
        if (when==2){
          showEl('provisionalThis');
        }
      }
      // registered in VA but different county/city/district
      if (reg == 2){
        if (when == 0){
          showEl('movedToHereRecently');
        }
        if (when >= 1){
          showEl('provisionalThis');
        }
      }
    }

  }