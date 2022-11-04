# Git Branch 전략

Github Flow를 사용함. 

### 각 Contributor별 전용 브랜치 목록

- @ShangbinLee : shangbin
- @sinbak : hs_back
- @jangjuntae : juntae
- @Byunjihun : jihun

__각 Contributor는 자신의 전용 브랜치를 제외한 나머지 브랜치들을 허락 없이 생성, 삭제, 푸시 하지 않도록 한다.(단, 로컬 레포지토리에서 사용은 가능)__

# Pull Request 전략

1. @Byunjihun, @jangjuntae은 PR시 2명의 Code Owners(@ShangbinLee, @sinbak)에게 approve를 받고
    main으로 merge할 수 있도록 함

2. @ShangbinLee, @sinbak은 PR시 서로에게만 approve를 받고도 main으로 merge할 수 있도록 함.   

    기본적으로는 2명에게 받아야 하지만 2명에 대해서는 bypass 할 수 있도록 설정함. 따라서, merge할 수 있는 상황이라고 하더라도 나머지 한 명의 code owner에게 approve 받지 않았다면 merge하지 않아야 함. 
    
    approve 받지 않고 merge 했다면 해당 내용을 revert 혹은 reset 하고 PR 과정을 거쳐야 함.