var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);

//
var main = $('.main');

//
var player = $('.player');

//
var repeat = $('.heading_option_repeat');

//
var random = $('.heading_option_random');

//
var setting = $('.heading_option_setting');
var overplay_setting = $('.overplay-setting');
var itemBody = $$('.setting__body_child');
var nameFunction = $$('.setting__header_item');
var nameTheme = $('.setting__body_theme');
var body_item = $$('.setting__body_item');

var checkCrossfade = $('.crossfade-input-check');
var checkFullSreen = $('.play-fullScreen');

var inputSecond = $('.second');
var second = $('.number-second span');



//
var list = $('.playlist');
var playList = $('.playlist_body');
var song = $('.playlist__song');

//
var nameHeader = $('.songplaying_name');
var imgHeader = $('.songplaying_thumb img');
var audio = $('.audio');


// 
var progress = $('.progress');
var startTime = $('.start');
var totalTime = $('.end');

//
var btn_play = $('.player__header_action_play-pause');

//
var back = $('.player__header_action_back');

//
var next = $('.player__header_action_next');

//
const vol = $('.volume');

//
var optionModal = $('.option');
var optionImg = $('.option__header_img img');
var optionName = $('.option__header_name');

var downLoad = $('.option__active__download');
downLoad.onclick = function() {
    confirm('Bạn muốn tải bài hát này về máy !');
}
                                        


var app = {
    currentIndex: 0,
    indexOption: 0,
    isPlaying: false,
    isRandom: false,
    isrepeat: false,
    songs: [
        {
            name:'Anh Sai Rồi',
            singer: 'Sơn tùng MT-P',
            path: './assets/music/anhsairoi.mp3',
            img: './assets/img/singer/sontung.jpg'
        },
        {
            name:'Buồn Của Anh',
            singer: 'Đạt G',
            path: './assets/music/buoncuaanh.mp3',
            img: './assets/img/singer/datg.jpg'
        },
        {
            name:'Buồn Không Em',
            singer: 'Đạt G',
            path: './assets/music/buonkhongem.mp3',
            img: './assets/img/singer/datg.jpg'
        },
        {
            name:'Chạy Ngay Đi',
            singer: 'Sơn tùng MT-P',
            path: './assets/music/chayngaydi.mp3',
            img: './assets/img/singer/sontung.jpg'
        },
        {
            name:'Đổi Thay',
            singer: 'Hồ Quang Hiếu',
            path: './assets/music/doithay.mp3',
            img: './assets/img/singer/hqhieu.jpg'
        },
        {
            name:'Ngã Tư Đường',
            singer: 'Hồ Quang Hiếu',
            path: './assets/music/ngatuduong.mp3',
            img: './assets/img/singer/hqhieu.jpg'
        },
        {
            name:'Nhạt',
            singer: 'Phan Mạnh Quỳnh',
            path: './assets/music/nhat.mp3',
            img: './assets/img/singer/phanmanhquynh.jpg'
        },
        {
            name:'Tri Kỷ',
            singer: 'Phan Mạnh Quỳnh',
            path: './assets/music/triky.mp3',
            img: './assets/img/singer/phanmanhquynh.jpg'
        }
    ],

    // tao ham defined properties
    definedProperties: function() {
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currentIndex];
            }
        })
    },
    
    // render song trong object ra ui
    render: function() {
        _this = this;
        var htmls = this.songs.map(function(song, index) {
            return  `<div class="playlist__song ${index === _this.currentIndex ? "active" : ""}" data-index='${index}'>
                        <div class="playlist__song_img">
                            <img src="${song.img}" alt="">
                        </div>
                        <div class="playlist__song_body">
                            <div>
                                <h2 class="playlist__song_body_namesong">${song.name}</h2>
                                <p class="playlist__song_body_singer">${song.singer}</p>
                            </div>
                            <div class="playlist__song_body_effect " data-index='${index}'>
                                <span class="span"></span>
                                <span class="span"></span>
                                <span class="span"></span>
                                <span class="span"></span>
                                <span class="span"></span>
                                <span class="span"></span>
                                <span class="span"></span>

                                <span class="span-fake"></span>
                                <span class="span-fake"></span>
                                <span class="span-fake"></span>
                                <span class="span-fake"></span>
                                <span class="span-fake"></span>
                                <span class="span-fake"></span>
                                <span class="span-fake"></span>
                            </div>
                        </div>
                        <div class="playlist__song_option">
                            <i class="fas fa-ellipsis-h"></i>
                        </div>
                    </div>`
                })
        var html = htmls.join('');
        playList.innerHTML = html;
    },
    
    // tai bai hat dau tien khi mo app len
    loadCurrentSong: function() {
        nameHeader.textContent = this.currentSong.name;
        imgHeader.src = this.currentSong.img;
        audio.src = this.currentSong.path;
    },

    // Ham xu ly khi back
    backSong: function() {
        this.currentIndex--;
        if(this.currentIndex < 0){
            this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong();
        this.scrollView();
    },

    // Ham xu ly khi next
    nextSong: function() {
        this.currentIndex++;
        if(this.currentIndex >= this.songs.length){
            this.currentIndex = 0;
        }
        this.loadCurrentSong();
        this.scrollView();
    },

    // Ham xu ly random
    playRandomSong: function() {
        var newIndex;
        do{
            newIndex = Math.floor(Math.random() * this.songs.length);
        }while(newIndex === this.currentIndex);

        this.currentIndex = newIndex;
        this.loadCurrentSong();
        this.scrollView();
    },

    // in to view song
    scrollView: function() {
        setTimeout(function() {
            $('.playlist__song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }, 200);
    }, 

    // in to view img option actived
    scrollViewOption: function() {
        setTimeout(function() {
            $('.setting__body_item.active i').scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
        }, 200);
    }, 
    
    handleEvent: function() {
        _this = this;

        // Xu ly khi click play/pause
        btn_play.onclick = function() {
            if(_this.isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
        }
        
        // Xu ly khi play/pause
        audio.onplay = function() {
            _this.isPlaying = true;
            player.classList.add('playing');

            // wave
            $$('.playlist__song_body_effect').forEach(function(effect) {
                if(Number(effect.dataset.index) === _this.currentIndex) {
                    effect.classList.add('active');
                }
            })
            
        };
        
        audio.onpause = function() {
            _this.isPlaying = false;
            player.classList.remove("playing");

            // wave
            $$('.playlist__song_body_effect').forEach(function(effect) {
                if(Number(effect.dataset.index) === _this.currentIndex) {
                    effect.classList.remove('active');
                }
            })
        };

        // Xu ly tien do bai hat thay doithay
        audio.ontimeupdate = function() {

            // progress
            var progressPercent = Math.floor(100 * this.currentTime / this.duration);
            progress.value = progressPercent || 0;

            
            var progressPercentBg = (progress.value / progress.max) * 100;
            var restPercent = 100% - progressPercentBg || 0;
            progress.style.background = `linear-gradient(90deg, var(--primary1-color) ${progressPercentBg}%, white ${restPercent}%`;


            // currentTime
            var minuteTime = parseInt(this.currentTime / 60);
            var secondTime = parseInt(this.currentTime % 60);

            if(secondTime < 10) {
                startTime.textContent = '0' + minuteTime + ':' + '0' + secondTime;
            } else {
                startTime.textContent = '0' + minuteTime + ':' + secondTime;
            }

            // duration
            if(this.duration) {
                var minuteTimeduration = parseInt(this.duration / 60);
                var secondTimeduration = parseInt(this.duration % 60);
                totalTime.textContent = '0' + minuteTimeduration + ":" + secondTimeduration;
            }
            
        };

        // Xu ly khi tua
        progress.oninput = function(e) {
            var sekkTime = audio.duration / 100 * e.target.value;
            audio.currentTime = sekkTime;
        }


        // Xu ly back song
        back.onclick = function(e) {
            if(_this.isRandom) {
                _this.playRandomSong()
            } else {
                _this.backSong();
            }
            
            
            audio.play();
            _this.render();
        };

        // Xu ly next song
        next.onclick = function(e) {
            if(_this.isRandom) {
                _this.playRandomSong();
            } else {
                _this.nextSong();
            }
            
            audio.play();
            _this.render();
        };

        // Xu ly click repeat
        repeat.onclick = function() {
            _this.isrepeat = !_this.isrepeat;
            repeat.classList.toggle('active', _this.isrepeat);
        }

        // Xu ly click random
        random.onclick = function() {
            _this.isRandom = !_this.isRandom;
            random.classList.toggle('active', _this.isRandom);
        }

        // Xu ly click setting
        setting.onclick = function() {
            overplay_setting.classList.add('active');
        };

        // Xu ly clcik overplay_setting
        overplay_setting.onclick = function(e) {
            if(e.target === e.currentTarget) {
                overplay_setting.classList.remove('active');
            }
        };

        // click name function
        nameFunction.forEach(function(name, index) {
            name.addEventListener('click', function(e) {
                
                $('.setting__header_item.active').classList.remove('active');
                name.classList.add('active');

                $('.setting__body_child.active').classList.remove('active');
                itemBody[index].classList.add('active');

                _this.scrollViewOption();
            })
        })

        // check input check second
        $('.label-scrossfade').onclick = function() {
            checkCrossfade.checked = !checkCrossfade.checked;
            var percent = (inputSecond.value / inputSecond.max) * 100;
            var restPercent = 100% - percent || 0;
            if(checkCrossfade.checked) {
                inputSecond.removeAttribute('disabled');
                inputSecond.style.background = `linear-gradient(90deg, #2AA5B3 ${percent}%, var(--white-color) ${restPercent}%`;

            } else {
                inputSecond.setAttribute('disabled', 'disabled');
                inputSecond.style.background = `linear-gradient(90deg, #d4dcdd ${percent}%, var(--white-color) ${restPercent}%`;
            }
        }

        // check input check full screen
        $('.label-full-screen').onclick = function() {
            checkFullSreen.checked = !checkFullSreen.checked;
        };

        second.innerHTML = inputSecond.value;
        // click input second
        inputSecond.oninput = function() {
            second.innerHTML = inputSecond.value;
        
            var percent = (inputSecond.value / inputSecond.max) * 100;
            var restPercent = 100% - percent || 0;
            inputSecond.style.background = `linear-gradient(90deg, #2AA5B3 ${percent}%, var(--white-color) ${restPercent}%`;
        }


        // Xu ly click setting img option
        body_item.forEach(function(item, index) {
            item.addEventListener('click', function() {

                $('.setting__body_item.active').classList.remove('active');

                item.classList.add('active');

                main.setAttribute('style', 'background-image: url(' + item.children[0].src + ');');
            });
        });
        
        // Xu ly khi bai hat ket thuc
        audio.onended = function() {

            function endSong() {
                if(_this.isrepeat) {
                    audio.play();
                } else {
                    if(_this.isRandom) {
                        _this.playRandomSong();
                    } else {
                        _this.nextSong();
                    }
                    audio.play();
                    _this.render();
                }
            }

            if(checkCrossfade.checked) {
                setTimeout(() => {
                    endSong();
                }, inputSecond.value * 1000);
            } else {
                endSong();
            }
            
        
            
        }

        // Ham bg volume
        vol.style.background = `linear-gradient(90deg, var(--text-color) 50%, white 50%`;
        vol.oninput = function() {
            var volPercent = (vol.value / vol.max) * 100;
            var restPercent = 100% - volPercent || 0;
            vol.style.background = `linear-gradient(90deg, var(--text-color) ${volPercent}%, white ${restPercent}%`;
            audio.volume = vol.value;
        }

        // click song 
        playList.onclick = function(e) {
            var songNode = e.target.closest('.playlist__song:not(.active)');
            var option = e.target.closest('.playlist__song_option');

            if(songNode || option) {
                if(songNode && !option) {

                    _this.currentIndex = Number(songNode.dataset.index);    
                    _this.loadCurrentSong()
                    audio.play();
                    _this.render();
                } else {
                    _this.indexOption = Number(e.target.closest('.playlist__song').dataset.index);    
                    optionImg.src = _this.songs[_this.indexOption].img;
                    optionName.textContent = _this.songs[_this.indexOption].name;
                    optionModal.classList.add('active');
                }
            }
        };

        // close modal option
        main.onclick = function(e) {
            var option = e.target.closest('.fas.fa-ellipsis-h');
            if(e.target !== option) {
                $('.option').classList.remove('active');
            }
        }
    },



    start: function() {
        this.definedProperties();
        this.render();
        this.loadCurrentSong();
        this.handleEvent();
    }
}
app.start();