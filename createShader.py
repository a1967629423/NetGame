import sys
from string import Template

if __name__ == "__main__":
    argv = sys.argv
    argv.reverse()
    if len(argv)>=3:
        print(argv.pop()) 
        name = argv.pop()
        output = argv.pop()
        with open('./template.js','r') as f1:
            a = Template(f1.read())
            outputString = a.substitute(name=name)
            with open(output,'w') as f2:
                f2.write(outputString)

    

