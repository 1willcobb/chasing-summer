@app
svChasingSummer

@aws
runtime nodejs18.x
# concurrency 1
# memory 1152
region us-west-1
# timeout 30

@http
/*
  method any
  src server

@plugins
plugin-remix
  src plugin-remix.js

@static

@tables
summer
  pk *String  # userId || other
  sk **String # sortkey 

password
  pk *String # userId
  sk **String # type
