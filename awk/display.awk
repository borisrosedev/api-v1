BEGIN { FS = ":.*## " }
{ printf "%s%-20s%s%s\n", info, $1, no, $2 }
