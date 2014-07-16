class apt_update {
    exec { "aptGetUpdate":
        command => "sudo apt-get update",
        path => ["/bin", "/usr/bin"]
    }
}

class tools {
    package { "git":
        ensure => latest,
        require => Exec["aptGetUpdate"]
    }

    package { "vim-common":
        ensure => latest,
        require => Exec["aptGetUpdate"]
    }

    package { "curl":
        ensure => present,
        require => Exec["aptGetUpdate"]
    }

    package { "htop":
        ensure => present,
        require => Exec["aptGetUpdate"]
    }
}
class node-js {
  include apt
  apt::ppa {
    'ppa:chris-lea/node.js': notify => Package["nodejs"]
  }

  package { "nodejs" :
      ensure => latest,
      require => [Exec["aptGetUpdate"],Class["apt"]]
  }

  exec { "npm-update" :
      cwd => "/vagrant",
      command => "npm -g update",
      onlyif => ["test -d /vagrant/node_modules"],
      path => ["/bin", "/usr/bin"],
      require => Package['nodejs']
  }
}

class mongodb {
  exec { "10genKeys":
    command => "sudo apt-key adv --keyserver keyserver.ubuntu.com --recv 7F0CEB10",
    path => ["/bin", "/usr/bin"],
    notify => Exec["aptGetUpdate"],
    unless => "apt-key list | grep 10gen"
  }

  file { "10gen.list":
    path => "/etc/apt/sources.list.d/10gen.list",
    ensure => file,
    content => "deb http://downloads-distro.mongodb.org/repo/debian-sysvinit dist 10gen",
    notify => Exec["10genKeys"]
  }

  package { "mongodb-10gen":
    ensure => present,
    require => [Exec["aptGetUpdate"],File["10gen.list"]]
  }
}


class rabbitmq {


	Exec {
	    path => "/bin:/sbin:/usr/bin:/usr/sbin:/usr/local/bin:/usr/local/sbin"
	}


	
        package { "python-software-properties":
                ensure => installed,
        }

        exec { "rabbitmq-apt-repo":
                command => "sudo apt-add-repository 'deb http://www.rabbitmq.com/debian/ testing main'",
                unless => "cat /etc/apt/sources.list | grep rabbitmq",
                require => Package["python-software-properties"],
        }

        exec { "rabbitmq-apt-key":
                command => "wget http://www.rabbitmq.com/rabbitmq-signing-key-public.asc -P /tmp/ && apt-key add /tmp/rabbitmq-signing-key-public.asc",
                unless => "apt-key list | grep -i rabbitmq",
                require => Exec["rabbitmq-apt-repo"],
        }

        exec { "update-apt":
                command => "apt-get update",
                require => Exec["rabbitmq-apt-key"],
        }

        package { rabbitmq-server:
                ensure => installed,
                require => Exec["update-apt"],
        }

		exec { "enable-mgmt-plugin":
			command => "sudo rabbitmq-plugins enable rabbitmq_management",
					require => Package[rabbitmq-server],
		}
		
		exec { "create-rabbit-user":
			command => "sudo rabbitmqctl add_user test 1234",
					require => Package[rabbitmq-server],
		}
		
		exec { "addpr-rabbit-user":
			command => "sudo rabbitmqctl set_user_tags test administrator",
					require => Package[rabbitmq-server],
		}

        service { "rabbitmq-server":
		restart => "sudo service rabbitmq-server restart",
                enable => true,
                ensure => running,
                require => Exec["enable-mgmt-plugin"],
        }
}

class mosquitto {
  exec { 'apt-get update':
    command => '/usr/bin/apt-get update'
  }
 
  exec { 'sudo add-apt-repository ppa:mosquitto-dev/mosquitto-ppa':
    command => 'sudo apt-add-repository ppa:mosquitto-dev/mosquitto-ppa',
    path => '/usr/bin/',
    require  => Package['python-software-properties']
  }
  exec { 'apt-get update II':
    command => '/usr/bin/apt-get update',
    require  => Exec['sudo add-apt-repository ppa:mosquitto-dev/mosquitto-ppa']
  }
  package { 'mosquitto':
    ensure  => installed,
    require  => Exec['apt-get update II'],
  }
  package { 'mosquitto-clients':
    ensure  => installed,
    require  => Exec['apt-get update II'],
  }

}


include apt_update
include tools
include node-js
include rabbitmq
include mosquitto
include mongodb