# parent 링크
find ./_posts -maxdepth 1 -name '*.md' -exec sed -i "" 's/parent  : \[\([^]]*\)\]/parent  : \[\[\1\]\]/g' {} \; 

# 위키 링크 
find ./_posts -maxdepth 1 -name '*.md' -exec sed -i "" '/^\!/! s/\[\([^]]*\)\](\/\([^]]*\))/\[\[\1\]\]/g' {} \;