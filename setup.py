import os, re, subprocess

root = "../.."

def run_command(cmd):
    print cmd
    os.system(cmd)

out = subprocess.check_output(["fs", "la", root])
cgi_user = re.findall('class.*\.cgi', out)[0]
run_command("fs sa %s %s rlidwk" % (root, cgi_user))

run_command("cp -r options/prod_options.py ohms/options.py")

run_command("cp -r ohms %s/" % root)
run_command("cp -r ohms %s/ohms_test" % root)
run_command("fs sa %s/ohms system:anyuser none" % root)
run_command("fs sa %s/ohms_test system:anyuser none" % root)

run_command("cp -r static %s/WWW/" % root)
run_command("cp -r static %s/WWW/static_test" % root)

run_command("cp cgi-bin/* %s/cgi-bin/" % root)
run_command("cp -r cgi-bin %s/cgi-bin/test" % root)
run_command("chmod 700 %s/cgi-bin/index.cgi" % root)
run_command("chmod 700 %s/cgi-bin/test/index.cgi" % root)
