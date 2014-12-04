var spec = require('./lib/spec')
var prompt = require('prompt')
prompt.start()

var modPath = '../../server_mods/com.wondible.pa.targeting_priorities/'
var stream = 'stable'
var media = require('./lib/path').media(stream)

module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    copy: {
      mod: {
        files: [
          {
            src: [
              'modinfo.json',
              'LICENSE.txt',
              'README.md',
              'CHANGELOG.md',
              'ui/**',
              'pa/**'],
            dest: modPath,
          },
        ],
      },
    },
    clean: ['pa', modPath],
    // copy files from PA, transform, and put into mod
    proc: {
      air_air: {
        targets: [
          'pa/units/air/fighter/fighter_tool_weapon.json'
        ],
        process: function(spec) {
          spec.target_priorities = ['Fighter', 'Fabber', 'Bomber | Gunship']
        }
      },
      air_ground: {
        targets: [
          'pa/units/air/bomber/bomber_tool_weapon.json',
          'pa/units/air/gunship/gunship_tool_weapon.json',
        ],
        process: function(spec) {
          spec.target_priorities = [
            'AirDefense | Naval & Tactical',
            'Bot & Offense & Basic - Construction - Artillery',
            'Fabber',
            'Defense',
            'Mobile | Structure - Wall'
          ]
        }
      },
      air_ground_tactical: {
        targets: [
          'pa/units/air/bomber_adv/bomber_adv_tool_weapon.json',
        ],
        process: function(spec) {
          spec.target_priorities = [
            'AirDefense | Naval & Tactical',
            'Fabber',
            'Defense',
            'Advanced',
            'Structure - Wall',
            'Mobile'
          ]
        }
      },
      ground_air: {
        targets: [
          'pa/units/land/aa_missile_vehicle/aa_missile_vehicle_tool_weapon.json',
          'pa/units/land/air_defense/air_defense_tool_weapon.json',
          'pa/units/land/air_defense_adv/air_defense_adv_tool_weapon.json',
          'pa/units/commanders/base_commander/base_commander_tool_aa_weapon.json',
          'pa/units/sea/figate/frigate_tool_weapon_aa.json',
          'pa/units/sea/missile_ship/missile_ship_aa_tool_weapon.json',
        ],
        process: function(spec) {
          spec.target_priorities = ['Bomber | Gunship', 'Fabber', 'Fighter']
        }
      },
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerMultiTask('proc', 'Process unit files into the mod', function() {
    if (this.data.targets) {
      var specs = spec.copyPairs(grunt, this.data.targets, media)
      spec.copyUnitFiles(grunt, specs, this.data.process)
    } else {
      var specs = this.filesSrc.map(function(s) {return grunt.file.readJSON(media + s)})
      var out = this.data.process.apply(this, specs)
      grunt.file.write(this.data.dest, JSON.stringify(out, null, 2))
    }
  })

  // Default task(s).
  grunt.registerTask('default', ['proc', 'copy:mod']);

};

