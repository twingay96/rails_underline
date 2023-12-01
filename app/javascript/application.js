// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"
//= require rails-ujs
//= require_tree .
//= require tasks

// 위의 주석들은 Sprockets에 의해 자동으로 해석되어 필요한 javascript 파일들을 로드하여 하나의 파일로 합침, 이렇게 하면
// 클라이언트 측에서는 하나의 파일만 로드하면 되므로 페이지 로딩속도가 향항됨 (최적화)



document.addEventListener("turbo:load", function(){
// document.addEventListener("turbo:load", function(){ }를 통해서 이벤트 리스너 내부{}에 포함된 코드는 비동기적으로 처리할 수 있음
// document.addEventListener("turbo:load", function(){ } 는 application.js에 위치시켜야함

    // 진행중, 완료 탭을 누르면 언더바가 이동한다
    // 완료탭은 완료된것만 진행중은 진행중인 것만

    let tabs = document.querySelectorAll(".task-tabs a");
    let horizontalMenus = document.querySelectorAll(".task-tabs a");
    let horizontalUnderline = document.getElementById("under-line");

    let filterList = [];
    let taskList = [];
    addButton.addEventListener("click", addTask);

    // 언더라인 구현 관련 로직
    console.log(horizontalMenus);
        // 초기 로딩 시 언더라인 위치 설정
    setInitialUnderlinePosition();
    // 브라우저 크기 변경 시 언더라인 위치 업데이트
    window.addEventListener("resize", () => {
    // resize 이벤트 발생 시 애니메이션 효과 제거
    horizontalUnderline.style.transition = "none";
    updateHorizontalUnderline();
    });

    horizontalMenus.forEach((menu) => {
    menu.addEventListener("click", (e) => {
        horizontalIndicator(e);
        // 선택한 메뉴의 정보를 로컬스토리지에 저장
        localStorage.setItem("selectedMenu", e.currentTarget.textContent);
    });
    });

    function setInitialUnderlinePosition() {
        // 초기에 선택할 메뉴를 여기에서 설정
        const selectedMenu = localStorage.getItem("selectedMenu");
        console.log("언더라인 초기위치 세팅함수동작");
        if(selectedMenu){
        console.log("새로고침이전에 지정되었던 메뉴는", selectedMenu)
        horizontalMenus.forEach((menu) => {
            if (menu.textContent == selectedMenu){
            activeMenu = menu;
            menu.classList.add("active");
            firstUpdateHorizontalUnderline();
            }
        });
        }else{
        activeMenu = horizontalMenus[0];
        console.log("초기 세팅은 all입니다.")
        firstUpdateHorizontalUnderline();
        }

    }

        // 언더라인 초기위치 설정함수 => 애니메이션 효과 적용X
    function firstUpdateHorizontalUnderline(){
        horizontalUnderline.style.transition = "none";
        horizontalUnderline.style.left = activeMenu.offsetLeft + "px";
        horizontalUnderline.style.width = activeMenu.offsetWidth + "px";
        horizontalUnderline.style.top =
        activeMenu.offsetTop + activeMenu.offsetHeight + "px";

    }



        // 메뉴항목 클릭시에만 호출할 함수 
    function updateHorizontalUnderline() {
        if (activeMenu) {
        if (activeMenu.classList.contains("active")) {
            // activeMenu의 경우 애니메이션 효과 적용
            horizontalUnderline.style.transition = "0.5s";
        } 
        // 이벤트리스너 resize로 호출된경우에는 activeMenu.classList에 active속성이 없으므로 애니메이션 효과적용X
        horizontalUnderline.style.left = activeMenu.offsetLeft + "px";
        horizontalUnderline.style.width = activeMenu.offsetWidth + "px";
        horizontalUnderline.style.top =
            activeMenu.offsetTop + activeMenu.offsetHeight + "px";
    
        // 브라우저가 리플로우되지 않도록 다른 속성 변경
        horizontalUnderline.style.transform = "translateZ(0)";
        }
        // 언더라인 이동완료후에는 active속성제거
        activeMenu.classList.remove("active");
    }
    
    function horizontalIndicator(e) {
        activeMenu = e.currentTarget; // 선택한 메뉴 정보 업데이트
        activeMenu.classList.add("active");
        updateHorizontalUnderline(); //언더라인 위치 옮기는 함수호출
    
    }

    // 여기서부터 모두, 진행중, 완료 구분 로직 
    for(let i=0; i<tabs.length;i++){
        tabs[i].addEventListener("click",function(event){filter(event)})
    }
    function filter(event){
        filterList= [];
        console.log(" event.target.id:",event.target.id);
        mode = event.target.id;
        console.log("filter클릭됨",event.target.id);
        if(mode == 'all'){
            console.log("all 필터 조건문 동작");
            console.log("taskList:", taskList);
            render();
        }else if(mode =='ongoing'){
            console.log("ongoing 필터 조건문 동작")
            for(let i=0; i<taskList.length; i++){
                if(taskList[i].isComplete == false  ){
                    filterList.push(taskList[i]);
                }
            }
            render();
        }else if(mode=="done"){
            console.log("done 필터 조건문 동작")
            for(let i=0; i<taskList.length; i++){
                if(taskList[i].isComplete == true ){
                    filterList.push(taskList[i]);
                }
            }
            render();
        }
        console.log("filterList:",filterList);
    }

    function addTask() {
    let task = {
        //객체 선언: 여러개의 정보를 포함시키고 싶을 경우사용
        id: randomIDGenerate(),
        taskContent: taskInput.value,
        isComplete: false,
    };
    taskList.push(task);
    console.log(taskList);
    render();
    }
    function render() {
    let resultHTML = "";
    let list = [];
    if (mode =="all"){
        list = taskList;
    }else if(mode =="ongoing" || mode =="done"){
        list = filterList;
    }
    
    }



});
