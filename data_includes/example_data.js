var shuffleSequence = seq("begin",
                        "startpractice",
                          sepWith("sep", seq("practice")),
 // putting counter after practice so it won't increment all at the same time when participants show up, as that messes up lists
                        "setcounter",
                        "starter",
 //                         sepWith("sep", rshuffle(startsWith("tr"), startsWith("in"), startsWith("fill"))),
                          sepWith("sep", rshuffle(startsWith("exp"), startsWith("fill"))),
 						"sendresults",
                          "completion",
                );

var showProgressBar =false;

var practiceItemTypes = ["practice"];

var manualSendResults = true;

var defaults = [
   // "Maze", {redo: true}, //uncomment to try "redo" mode
];

// The following example inserts a "pause" Message at every nth item (where i % n)
// The % operator returns the remainder of two numbers, so will be 0 when a multiple of n

//function modifyRunningOrder(ro) {
// for (var i = 1; i < ro.length; ++i) {
//     if (i % 50 == 0) {
//              // Passing 'true' as the third argument casues the results from this controller
//            // to be omitted from the results file. (Though in fact, the Message controller
//          // does not add any results in any case.)
//           ro[i].push(new DynamicElement(
//                 "Message",
//               //    { html: "<p>Pause</p>", transfer: 1000 },
//                     { html: "<p>You can take a short break (1 minute or less) here if needed. Press any key to continue.</p>", transfer: "keypress" },
//  						true
//               ));
//           }
//        }
//       return ro;
//    }

// following is from the A-maze site to make breaks every 12 maze sentences
// you have to set the write number of total items and number of blocks to start with, and the right condition names, etc.
// calculate the following numbers to fill in the values below (not including practice trials-
// total maze sentences a participant will be presented: 83
// sentences per block: 12
// number of blocks: 7 (last incomplete)

function modifyRunningOrder(ro) {

  var new_ro = [];
  item_count=0;
  for (var i in ro) {
    var item = ro[i];
    // fill in the relevant experimental condition names on the next line
    if (item[0].type.startsWith("rel")|| item[0].type.startsWith("exp") || item[0].type.startsWith("fill")) {
        item_count++;
        new_ro.push(item);
      // first number after item count is how many items between breaks. second is total-items - 1
        if (item_count%12===0 & item_count<82){
       // value here should be total_items - items_per_block (to trigger message that last block is coming up)
            if (item_count===72){
                text="End of block. Only 1 block left!";
                }
            else {
      // first number is the total number of blocks. second number is number of items per block
                text="End of block. "+(7-(Math.floor(item_count/12)))+" blocks left.";
            }ro[i].push(new DynamicElement("Message", 
                              { html: "<p>30-second break - stretch and look away from the screen briefly if needed.</p>", transfer: 30000 }));
        }
      } else {
      new_ro.push(item);
      }
  }
  return new_ro;
}


var items = [

	["setcounter", "__SetCounter__", { }],

	["sendresults", "__SendResults__", { }],

	["sep", "MazeSeparator", {normalMessage: "Correct! Press any key to continue", errorMessage: "Incorrect! Press any key to continue."}],

["begin", "Form", { html: { include: "consent.html" } } ],

["begin", "Form", {
	html: { include: "demo.html" },
	validators: {
		age: function (s) { if (s.match(/^\d+$/)) return true; else return "Bad value for \u2018age\u2019"; }
	}
} ],

["begin", "Form", { html: { include: "intro1.html" } } ],

["startpractice", Message, {consentRequired: false,
	html: ["div",
		   ["p", "First you can do three practice sentences."]
		  ]}],

//
//  practice items
//

[["practice", 801], "Maze", {s:"Who did the teacher perplex in the first class?", a:"x-x-x ice skin tends bisects vs done continues holy?"}],
[["practice", 802], "Maze", {s:"Why was the boss smiling during the meeting?", a:"x-x-x card plan chaired filters allow push considerably?"}],
[["practice", 803], "Maze", {s:"Why was the boy chuckling while he cleaned?", a:"x-x-x unit hall slid quadratic goals add analyst?"}],


//		["instructions2", "Message", {html:'End of sample Maze experiment.'}],
//	["intro-gram", "Message", {html: "<p>For this experiment, please place your left index finger on the 'e' key and your right index finger on the 'i' key.</p><p> You will read sentences word by word. On each screen you will see two options: one will be the next word in the sentence, and one will not. Select the word that continues the sentence by pressing 'e' (left-hand) for the word on the left or pressing 'i' (right-hand) for the word on the right.</p><p>Select the best word as quickly as you can, but without making too many errors.</p>"}],
//	["intro-practice", "Message", {html: "The following items are for practice." }],
//	["end-practice", "Message", {html: "End of practice. The experiment will begin next."}],
//	["done", "Message", {html: "All done!"}],

   // message that the experiment is beginning


   ["starter", Message, {consentRequired: false,
	html: ["div",
		   ["p", "Time to start the main portion of the experiment!"]
		  ]}],



// experimental stimuli:

[["exp.caus.tran.101", 101], "Maze", {s:"What did the clown pop at the party?", a:"x-x-x sick gal tuned ben pre draw thank?"}],
[["exp.caus.intr.101", 101], "Maze", {s:"When did the balloons pop at the party?", a:"x-x-x miss felt occupies ben pre mom lived?"}],
[["exp.caus.tran.102", 102], "Maze", {s:"What did the maid shrink at the laundromat?", a:"x-x-x dig uses slid hitter jack dad certifying?"}],
[["exp.caus.intr.102", 102], "Maze", {s:"When did the sweater shrink at the laundromat?", a:"x-x-x miss anti emerges hitter jack army editorials?"}],
[["exp.caus.tran.103", 103], "Maze", {s:"What did the leak corrode in the bathroom wall?", a:"x-x-x save feet amid imputed mom pre suffered anti?"}],
[["exp.caus.intr.103", 103], "Maze", {s:"When did the pipe corrode in the bathroom wall?", a:"x-x-x miss able hers imputed mom okay treating wild?"}],
[["exp.caus.tran.104", 104], "Maze", {s:"What did the mechanic deflate at the automotive repair shop?", a:"x-x-x mind able resisted ascetic anti hate ecosystems priest glad?"}],
[["exp.caus.intr.104", 104], "Maze", {s:"When did the tire deflate at the automotive repair shop?", a:"x-x-x miss yes hers ascetic anti told comprehend struck soul?"}],
[["exp.caus.tran.105", 105], "Maze", {s:"What did the chemist dissolve in the beaker?", a:"x-x-x soul feet greeted cruising hate sir eschew?"}],
[["exp.caus.intr.105", 105], "Maze", {s:"When did the powder dissolve in the beaker?", a:"x-x-x miss jams enjoys cruising hate trip yachts?"}],
[["exp.caus.tran.106", 106], "Maze", {s:"What did the sunlight fade on the dining room wall?", a:"x-x-x ago pre resisted bans uses dad relies cash glad?"}],
[["exp.caus.intr.106", 106], "Maze", {s:"When did the photograph fade on the dining room wall?", a:"x-x-x lie yes determines bans uses sir intend none luck?"}],
[["exp.caus.tran.107", 107], "Maze", {s:"What did the bride fray on the wedding dress?", a:"x-x-x net feet pulls anew pre map nowhere write?"}],
[["exp.caus.intr.107", 107], "Maze", {s:"When did the hem fray on the wedding dress?", a:"x-x-x lie felt hers anew pre gone anybody brave?"}],
[["exp.caus.tran.108", 108], "Maze", {s:"What did the researcher freeze in the chemistry lab?", a:"x-x-x slap uses celebrates capita sad anti commanded mum?"}],
[["exp.caus.intr.108", 108], "Maze", {s:"When did the liquid freeze in the chemistry lab?", a:"x-x-x lie glad waited capita sad kid democrats fate?"}],
[["exp.caus.tran.109", 109], "Maze", {s:"What did the gardener grow next to the daffodils?", a:"x-x-x sort lady conceded anti vote lack pre bulkheads?"}],
[["exp.caus.intr.109", 109], "Maze", {s:"When did the tomatoes grow next to the daffodils?", a:"x-x-x lie glad resisted anti vote seat anti autosomal?"}],
[["exp.caus.tran.110", 110], "Maze", {s:"What did the manager halt in the car factory?", a:"x-x-x kill jerk nowhere null oh mom nor discuss?"}],
[["exp.caus.intr.110", 110], "Maze", {s:"When did the machine halt in the car factory?", a:"x-x-x hate cent follows null oh soul ago precise?"}],
[["exp.caus.tran.111", 111], "Maze", {s:"What did the principal improve for the second grade class?", a:"x-x-x kill feet attracted nowhere bet ago listen filed trump?"}],
[["exp.caus.intr.111", 111], "Maze", {s:"When did the scores improve for the second grade class?", a:"x-x-x cent able pushed nowhere bet ran caused stuck earth?"}],
[["exp.caus.tran.112", 112], "Maze", {s:"What did the mayor inflate for the parade?", a:"x-x-x cent bus drawn wettest sad else firmly?"}],
[["exp.caus.intr.112", 112], "Maze", {s:"When did the float inflate for the parade?", a:"x-x-x lie sum tends wettest sad plan speaks?"}],
[["exp.caus.tran.113", 113], "Maze", {s:"What did the butler chip before the dinner party?", a:"x-x-x mind west relies east global fan seemed maybe?"}],
[["exp.caus.intr.113", 113], "Maze", {s:"When did the bowl chip before the dinner party?", a:"x-x-x cent felt kept east global mom taught miles?"}],
[["exp.caus.tran.114", 114], "Maze", {s:"What did the cleaners crack in the living room?", a:"x-x-x plus uses authored loans sir bus expect stay?"}],
[["exp.caus.intr.114", 114], "Maze", {s:"When did the vase crack in the living room?", a:"x-x-x cent rote lobe loans sir guys served paid?"}],
[["exp.caus.tran.115", 115], "Maze", {s:"What did the baseball shatter on the nicely set table?", a:"x-x-x silo lady reflects bondage dad jobs prayed none enjoy?"}],
[["exp.caus.intr.115", 115], "Maze", {s:"When did the glass shatter on the nicely set table?", a:"x-x-x walk yes yours bondage dad mind learnt term funny?"}],
[["exp.caus.tran.116", 116], "Maze", {s:"What did the lightning snap off of the oak tree?", a:"x-x-x pull lady conducted reds dad yes wish und gain?"}],
[["exp.caus.intr.116", 116], "Maze", {s:"When did the branch snap off of the oak tree?", a:"x-x-x walk yeah jumped reds dad al seen wed soul?"}],
[["exp.caus.tran.117", 117], "Maze", {s:"What did the dancer tear during the performance?", a:"x-x-x mind jerk pushed troy minute map considering?"}],
[["exp.caus.intr.117", 117], "Maze", {s:"When did the costume tear during the performance?", a:"x-x-x walk lady reminds troy minute west individuals?"}],
[["exp.caus.tran.118", 118], "Maze", {s:"What did the council change at the intersection?", a:"x-x-x send west reached nobody al wall investigator?"}],
[["exp.caus.intr.118", 118], "Maze", {s:"When did the light change at the intersection?", a:"x-x-x walk felt aware nobody al born combinations?"}],
[["exp.caus.tran.119", 119], "Maze", {s:"What did the bartender cool in the refrigerator?", a:"x-x-x not bus rescinded mile yeah fund transporting?"}],
[["exp.caus.intr.119", 119], "Maze", {s:"When did the soup cool in the refrigerator?", a:"x-x-x hate knew eats mile yeah done philosophers?"}],
[["exp.caus.tran.120", 120], "Maze", {s:"What did the father dry on the front porch?", a:"x-x-x rid nor played gulf yeah guys agree abide?"}],
[["exp.caus.intr.120", 120], "Maze", {s:"When did the towel dry on the front porch?", a:"x-x-x walk knew tends gulf yeah sir heard chant?"}],
[["exp.caus.tran.121", 121], "Maze", {s:"What did the botanist grow in the greenhouse?", a:"x-x-x dig west utilised keys bet guy violations?"}],
[["exp.caus.intr.121", 121], "Maze", {s:"When did the vegetables grow in the greenhouse?", a:"x-x-x hate yeah celebrates keys bet knew confronted?"}],
[["exp.caus.tran.122", 122], "Maze", {s:"What did the compressor inflate at the carnival?", a:"x-x-x save nor conversely pinkish deal soul explores?"}],
[["exp.caus.intr.122", 122], "Maze", {s:"When did the moonwalk inflate at the carnival?", a:"x-x-x eat able bypasses pinkish deal non approves?"}],
[["exp.caus.tran.123", 123], "Maze", {s:"What did the cook thaw in the cafeteria?", a:"x-x-x hear west onto hubs cell link superiors?"}],
[["exp.caus.intr.123", 123], "Maze", {s:"When did the popsicle thaw in the cafeteria?", a:"x-x-x sir felt granular hubs cell yeah scratched?"}],
[["exp.caus.tran.124", 124], "Maze", {s:"What did the fisherman sink in the lake?", a:"x-x-x slap uses unnoticed euro okay guys mate?"}],
[["exp.caus.intr.124", 124], "Maze", {s:"When did the paddle sink in the lake?", a:"x-x-x hear able evokes euro okay drug sent?"}],
[["exp.caus.tran.125", 125], "Maze", {s:"What did the machine dry at the salon?", a:"x-x-x burn seat carried mid born seen baron?"}],
[["exp.caus.intr.125", 125], "Maze", {s:"When did the hair dry at the salon?", a:"x-x-x till lady held mid born died stare?"}],
[["exp.caus.tran.126", 126], "Maze", {s:"What did the cashier close in the store?", a:"x-x-x silo sick adhered weird kept fund agree?"}],
[["exp.caus.intr.126", 126], "Maze", {s:"When did the registers close in the store?", a:"x-x-x eat yes persisted weird kept okay feels?"}],
[["exp.caus.tran.127", 127], "Maze", {s:"What did the thief ignite in the garage?", a:"x-x-x mind bus lacks rarity map link hiking?"}],
[["exp.caus.intr.127", 127], "Maze", {s:"When did the fire ignite in the garage?", a:"x-x-x eat rote knew rarity map goes checks?"}],
[["exp.caus.tran.128", 128], "Maze", {s:"What did the bodybuilder stretch during the exercise routine?", a:"x-x-x nor bus uncontested pending author knew download jealous?"}],
[["exp.caus.intr.128", 128], "Maze", {s:"When did the muscles stretch during the exercise routine?", a:"x-x-x eat nut cheated pending author guy relating deserve?"}],
[["exp.caus.tran.129", 129], "Maze", {s:"What did the driver crash into the tree?", a:"x-x-x save nor indeed toxic born bill pray?"}],
[["exp.caus.intr.129", 129], "Maze", {s:"When did the biker crash into the tree?", a:"x-x-x eat plus fared toxic born note send?"}],
[["exp.caus.tran.130", 130], "Maze", {s:"What did the loggers clear from the rainforest?", a:"x-x-x save sick spanned angel okay pro redirected?"}],
[["exp.caus.intr.130", 130], "Maze", {s:"When did the precipitation clear from the rainforest?", a:"x-x-x till rat characterised angel okay send exhibiting?"}],
[["exp.caus.tran.131", 131], "Maze", {s:"What did the detective collect from the crime scene?", a:"x-x-x pull rat fulfilled broader join push apply fresh?"}],
[["exp.caus.intr.131", 131], "Maze", {s:"When did the investigator collect from the crime scene?", a:"x-x-x till plus consequently broader join wish lived worry?"}],
[["exp.caus.tran.132", 132], "Maze", {s:"What did the victim collect from the insurance agency?", a:"x-x-x send east whilst premier join push recognize stupid?"}],
[["exp.caus.intr.132", 132], "Maze", {s:"When did the defendant collect from the insurance agency?", a:"x-x-x till non struggled premier join rate continues active?"}],
[["exp.caus.tran.133", 133], "Maze", {s:"What did the escorts clear out of the auditorium?", a:"x-x-x send sick reliant solar wife cup kept instituted?"}],
[["exp.caus.intr.133", 133], "Maze", {s:"When did the crowd clear out of the auditorium?", a:"x-x-x till plus aimed solar wife pull dear songwriter?"}],
[["exp.caus.tran.134", 134], "Maze", {s:"What did the mixer crumble in the bakery?", a:"x-x-x kill door fined densely park lord forbid?"}],
[["exp.caus.intr.134", 134], "Maze", {s:"When did the piecrust crumble in the bakery?", a:"x-x-x hear fat polytope densely park plus enroll?"}],
[["exp.caus.tran.135", 135], "Maze", {s:"What did the athlete fracture at the basketball game?", a:"x-x-x pull east erected flagship al sent innovation nice?"}],
[["exp.caus.intr.135", 135], "Maze", {s:"When did the ankle fracture at the basketball game?", a:"x-x-x hear fat cared flagship al into amendments skin?"}],
[["exp.caus.tran.136", 136], "Maze", {s:"What did the detergent fade in the washer?", a:"x-x-x burn east remarried aunt sea fund confer?"}],
[["exp.caus.intr.136", 136], "Maze", {s:"When did the jeans fade in the washer?", a:"x-x-x ago sure borne aunt sea ask frauds?"}],
[["exp.caus.tran.137", 137], "Maze", {s:"What did the washer flood in the utility room?", a:"x-x-x burn door exited angel non ask tuition hurt?"}],
[["exp.caus.intr.137", 137], "Maze", {s:"When did the tub flood in the utility room?", a:"x-x-x hear fat hoc angel non boys accepts sell?"}],
[["exp.caus.tran.138", 138], "Maze", {s:"What did the plaque clog in the heart?", a:"x-x-x dog east mapped foes hour okay avoid?"}],
[["exp.caus.intr.138", 138], "Maze", {s:"When did the artery clog in the heart?", a:"x-x-x mean sure denies foes hour kids began?"}],
[["exp.caus.tran.139", 139], "Maze", {s:"What did the cook heat in the oven?", a:"x-x-x silo east kept pope none map zoom?"}],
[["exp.caus.intr.139", 139], "Maze", {s:"When did the food heat in the oven?", a:"x-x-x mean sure goes pope none seen sins?"}],
[["exp.caus.tran.140", 140], "Maze", {s:"What did the nanny soak in the washtub?", a:"x-x-x kill wall flown dusk born mark fencers?"}],
[["exp.caus.intr.140", 140], "Maze", {s:"When did the socks soak in the washtub?", a:"x-x-x ago fat slept dusk born ask airings?"}],
[["exp.caus.tran.141", 141], "Maze", {s:"What did the skydiver open in the air?", a:"x-x-x limp cars overruns busy oh guys sent?"}],
[["exp.caus.intr.141", 141], "Maze", {s:"When did the parachute open in the air?", a:"x-x-x ago sure comprises busy oh add goes?"}],
[["exp.caus.tran.142", 142], "Maze", {s:"What did the trainer balance on the dog's nose?", a:"x-x-x kill sick advised nowhere oh lord lured onto?"}],
[["exp.caus.intr.142", 142], "Maze", {s:"When did the treat balance on the dog's nose?", a:"x-x-x mean sure forth nowhere oh guys valor flew?"}],
[["exp.caus.tran.143", 143], "Maze", {s:"What did the cast heal in the hospital?", a:"x-x-x dear cars thus null vote join consider?"}],
[["exp.caus.intr.143", 143], "Maze", {s:"When did the injury heal in the hospital?", a:"x-x-x mean ran occurs null vote ask produced?"}],
[["exp.act.tran.201", 101], "Maze", {s:"What did the hiker chop for the camp fire?", a:"x-x-x fix door sited akin mid kept deny dean?"}],
[["exp.act.intr.201", 101], "Maze", {s:"When did the hiker chop for the camp fire?", a:"x-x-x mean ran waxes akin mid fund pray dumb?"}],
[["exp.act.tran.202", 102], "Maze", {s:"What did the maid dust before the guests arrived?", a:"x-x-x silo cars lent oval county link argues efforts?"}],
[["exp.act.intr.202", 102], "Maze", {s:"When did the maid dust before the guests arrived?", a:"x-x-x sell pro slid oval county bet forgot islands?"}],
[["exp.act.tran.203", 103], "Maze", {s:"What did the teacher hum for the music students?", a:"x-x-x pun door carried troy goal map shall northern?"}],
[["exp.act.intr.203", 103], "Maze", {s:"When did the teacher hum for the music students?", a:"x-x-x spot ran follows troy goal plan seems republic?"}],
[["exp.act.tran.204", 104], "Maze", {s:"What did the gardener mow during the three-day weekend?", a:"x-x-x silo cart explores ire secret aid therefore require?"}],
[["exp.act.intr.204", 104], "Maze", {s:"When did the gardener mow during the three-day weekend?", a:"x-x-x sell pro promotes ire secret ran certainly appears?"}],
[["exp.act.tran.205", 105], "Maze", {s:"What did the couple pack for the vacation to Thailand?", a:"x-x-x dig cars anyway tech stay link evaluate mm Boundary?"}],
[["exp.act.intr.205", 105], "Maze", {s:"When did the couple pack for the vacation to Thailand?", a:"x-x-x sell wall unless tech stay rate democrat need violated?"}],
[["exp.act.tran.206", 106], "Maze", {s:"What did the child play with the neighbor's kids?", a:"x-x-x pull wall ended hill lack push speculated tons?"}],
[["exp.act.intr.206", 106], "Maze", {s:"When did the child play with the neighbor's kids?", a:"x-x-x sell pro broke hill lack lot bequeathed none?"}],
[["exp.act.tran.207", 107], "Maze", {s:"What did the farmer plow around the silo?", a:"x-x-x am met warned mica author band stun?"}],
[["exp.act.intr.207", 107], "Maze", {s:"When did the farmer plow around the silo?", a:"x-x-x bed pro pushed mica author fix puns?"}],
[["exp.act.tran.208", 108], "Maze", {s:"What did the professor read for the philosophy seminar?", a:"x-x-x not mid conducted jaws kid draw definitely vendors?"}],
[["exp.act.intr.208", 108], "Maze", {s:"When did the professor read for the philosophy seminar?", a:"x-x-x bed isle therefore jaws kid nice represents antenna?"}],
[["exp.act.tran.209", 109], "Maze", {s:"What did the poet recite in front of the English class?", a:"x-x-x not met spam rebate keep ahead site add perhaps terms?"}],
[["exp.act.intr.209", 109], "Maze", {s:"When did the poet recite in front of the English class?", a:"x-x-x bed isle hung rebate keep agree wish form despite worth?"}],
[["exp.act.tran.210", 110], "Maze", {s:"What did the musician sing at Radio City Music Hall?", a:"x-x-x dig met thrilled semi al spent duke worry cash?"}],
[["exp.act.intr.210", 110], "Maze", {s:"When did the musician sing at Radio City Music Hall?", a:"x-x-x bed hill resisted semi al gotta hunt enjoy draw?"}],
[["exp.act.tran.211", 111], "Maze", {s:"What did the seamstress sew at the historical fair?", a:"x-x-x sun cup carbonates nun sad spot appreciate grenade?"}],
[["exp.act.intr.211", 111], "Maze", {s:"When did the seamstress sew at the historical fair?", a:"x-x-x bed met tantamount nun sad guy everywhere force?"}],
[["exp.act.tran.212", 112], "Maze", {s:"What did the inventor sketch in the park?", a:"x-x-x nut cup declares stigma oh guy thus?"}],
[["exp.act.intr.212", 112], "Maze", {s:"When did the inventor sketch in the park?", a:"x-x-x spot cat streamed stigma oh wish whom?"}],
[["exp.act.tran.213", 113], "Maze", {s:"What did the minister study at Cambridge University?", a:"x-x-x fax met designed stats fan dimension additional?"}],
[["exp.act.intr.213", 113], "Maze", {s:"When did the minister study at Cambridge University?", a:"x-x-x wait eyes provides stats fan artillery protection?"}],
[["exp.act.tran.214", 114], "Maze", {s:"What did the janitor sweep for the landlady?", a:"x-x-x sewn mid spanned vines lord sold appoints?"}],
[["exp.act.intr.214", 114], "Maze", {s:"When did the janitor sweep for the landlady?", a:"x-x-x wait cat retains vines lord wish subtypes?"}],
[["exp.act.tran.215", 115], "Maze", {s:"What did the mathematician teach in San Francisco?", a:"x-x-x sun cup characterised metro cool hurt respected?"}],
[["exp.act.intr.215", 115], "Maze", {s:"When did the mathematician teach in San Francisco?", a:"x-x-x lose isle characterizes metro cool fell reduction?"}],
[["exp.act.tran.216", 116], "Maze", {s:"What did the editor type for the unconventional writer?", a:"x-x-x fix cup abroad pope lord sun quantitatively urgent?"}],
[["exp.act.intr.216", 116], "Maze", {s:"When did the editor type for the unconventional writer?", a:"x-x-x wait cat occurs pope lord than egalitarianism funded?"}],
[["exp.act.tran.217", 117], "Maze", {s:"What did the courier vacuum after the delivery?", a:"x-x-x fix past devised stigma happy feel replaced?"}],
[["exp.act.intr.217", 117], "Maze", {s:"When did the courier vacuum after the delivery?", a:"x-x-x wait eyes onwards stigma happy cat entitled?"}],
[["exp.act.tran.218", 118], "Maze", {s:"What did the woodworker whittle on the front porch?", a:"x-x-x save past centerline decking sad guy aware cyber?"}],
[["exp.act.intr.218", 118], "Maze", {s:"When did the woodworker whittle on the front porch?", a:"x-x-x wait must heuristics decking sad gone meant sperm?"}],
[["exp.act.tran.219", 119], "Maze", {s:"What did the class weave for the community art project?", a:"x-x-x sour past aware rainy born told certainly min finding?"}],
[["exp.act.intr.219", 119], "Maze", {s:"When did the class weave for the community art project?", a:"x-x-x kid luck seems rainy born died therefore pain husband?"}],
[["exp.act.tran.220", 120], "Maze", {s:"What did the journalist write for the New Yorker?", a:"x-x-x sun past accordance queen bar rate Else Badges?"}],
[["exp.act.intr.220", 120], "Maze", {s:"When did the journalist write for the New Yorker?", a:"x-x-x lose dead criticized queen bar ring here banter?"}],
[["exp.act.tran.221", 121], "Maze", {s:"What did the hygienist floss at the dentist's?", a:"x-x-x shop past disputing gable sad shot loanwords?"}],
[["exp.act.intr.221", 121], "Maze", {s:"When did the hygienist floss at the dentist's?", a:"x-x-x lose cat aspirated gable sad kind admixture?"}],
[["exp.act.tran.222", 122], "Maze", {s:"What did the author read to the elementary students?", a:"x-x-x slap dead indeed holy lose trip altogether expected?"}],
[["exp.act.intr.222", 122], "Maze", {s:"When did the author read to the elementary students?", a:"x-x-x seem hill caused holy lose loss kilometres greatest?"}],
[["exp.act.tran.223", 123], "Maze", {s:"What did the landlord plow after the blizzard?", a:"x-x-x slap lord conceded mica learn ring excelled?"}],
[["exp.act.intr.223", 123], "Maze", {s:"When did the landlord plow after the blizzard?", a:"x-x-x lose hill promotes mica learn ways memorize?"}],
[["exp.act.tran.224", 124], "Maze", {s:"What did the choir sing at the spring concert?", a:"x-x-x sour dead tends semi skin went helped letting?"}],
[["exp.act.intr.224", 124], "Maze", {s:"When did the choir sing at the spring concert?", a:"x-x-x mark hill aloud semi skin won served genetic?"}],
[["exp.act.tran.225", 125], "Maze", {s:"What did the cartoonist sketch for the comic magazine?", a:"x-x-x sour dead reiterated lizard lake fund grows download?"}],
[["exp.act.intr.225", 125], "Maze", {s:"When did the cartoonist sketch for the comic magazine?", a:"x-x-x kid luck symbolized lizard lake bill sworn terrible?"}],
[["exp.act.tran.226", 126], "Maze", {s:"What did the landscaper mow in the backyard?", a:"x-x-x sour dead seasonings rums vs pick snatched?"}],
[["exp.act.intr.226", 126], "Maze", {s:"When did the landscaper mow in the backyard?", a:"x-x-x mark luck metastable rums vs seen promptly?"}],
[["exp.act.tran.227", 127], "Maze", {s:"What did the illustrator draw for a children's book?", a:"x-x-x sill bet hypothermia semi risk mm thereafter sent?"}],
[["exp.act.intr.227", 127], "Maze", {s:"When did the illustrator draw for a children's book?", a:"x-x-x mark luck encompasses semi risk oh guidelines ways?"}],
[["exp.act.tran.228", 128], "Maze", {s:"What did the handyman paint in the auto body shop?", a:"x-x-x sill bet reverted safer vs rate unto wife dear?"}],
[["exp.act.intr.228", 128], "Maze", {s:"When did the handyman paint in the auto body shop?", a:"x-x-x kid went dislodge safer vs risk lied goal cash?"}],
[["exp.act.tran.229", 129], "Maze", {s:"What did the pianist play in the music competition?", a:"x-x-x sill text onwards baby stay ride worth individuals?"}],
[["exp.act.intr.229", 129], "Maze", {s:"When did the pianist play in the music competition?", a:"x-x-x mark must cropped baby stay sold agree responsible?"}],
[["exp.act.tran.230", 130], "Maze", {s:"What did the jeweler sculpt for the final project?", a:"x-x-x buy text absorbs thorax lost draw heard anymore?"}],
[["exp.act.intr.230", 130], "Maze", {s:"When did the jeweler sculpt for the final project?", a:"x-x-x dear must flocked thorax lots than agree follows?"}],
[["exp.act.tran.231", 131], "Maze", {s:"What did the associate knit between working double shifts?", a:"x-x-x buy text conducted dusk banters carried forget alpine?"}],
[["exp.act.intr.231", 131], "Maze", {s:"When did the associate knit between working double shifts?", a:"x-x-x seem must depending dusk banters million ignore costly?"}],
[["exp.act.tran.232", 132], "Maze", {s:"What did the father shave in front of the mirror?", a:"x-x-x buy text looked versa vs rates easy trip unfair?"}],
[["exp.act.intr.232", 132], "Maze", {s:"When did the father shave in front of the mirror?", a:"x-x-x seem must unless versa vs apply play push rivers?"}],
[["exp.act.tran.233", 133], "Maze", {s:"What did the third-grader write on the chalkboard?", a:"x-x-x buy age discouraging frank mm runs concubines?"}],
[["exp.act.intr.233", 133], "Maze", {s:"When did the third-grader write on the chalkboard?", a:"x-x-x seem went accommodated frank mm hurt publicised?"}],
[["exp.act.tran.234", 134], "Maze", {s:"What did the teenager eat in the lunchroom?", a:"x-x-x buy age promotes lake mm rate amidships?"}],
[["exp.act.intr.234", 134], "Maze", {s:"When did the teenager eat in the lunchroom?", a:"x-x-x seem went resisted lake mm thus anatomist?"}],
[["exp.act.tran.235", 135], "Maze", {s:"What did the birds drink from the waterfall?", a:"x-x-x ago text aimed fifth page ask prohibits?"}],
[["exp.act.intr.235", 135], "Maze", {s:"When did the birds drink from the waterfall?", a:"x-x-x dear gets forth fifth page done knowingly?"}],
[["exp.act.tran.236", 136], "Maze", {s:"What did the secretary dust off the filing cabinets?", a:"x-x-x over holy therefore oval lots care relies biblical?"}],
[["exp.act.intr.236", 136], "Maze", {s:"When did the secretary dust off the filing cabinets?", a:"x-x-x dear went continues oval lots want albeit flirting?"}],
[["exp.act.tran.237", 137], "Maze", {s:"What did the shoeshine polish at the airport?", a:"x-x-x curt age loanwords upside wife laws follows?"}],
[["exp.act.intr.237", 137], "Maze", {s:"When did the shoeshine polish at the airport?", a:"x-x-x feel gets overhears upside wife idea explain?"}],
[["exp.act.tran.238", 138], "Maze", {s:"What did the babysitter hum for the infant?", a:"x-x-x cast age skepticism hubs wife copy argues?"}],
[["exp.act.intr.238", 138], "Maze", {s:"When did the babysitter hum for the infant?", a:"x-x-x feel gets bronchitis hubs wife laws admire?"}],
[["exp.act.tran.239", 139], "Maze", {s:"What did the waiter clean off the table?", a:"x-x-x cast age declares virus bit link knows?"}],
[["exp.act.intr.239", 139], "Maze", {s:"When did the waiter clean off the table?", a:"x-x-x seat hope bordered virus bit non aware?"}],
[["exp.act.tran.240", 140], "Maze", {s:"What did the busboy wash off the dishes?", a:"x-x-x stop goal baleen rude cash non denied?"}],
[["exp.act.intr.240", 140], "Maze", {s:"When did the busboy wash off the dishes?", a:"x-x-x feel hope coupes rude cash paid namely?"}],
[["exp.act.tran.241", 141], "Maze", {s:"What did the housekeeper vacuum on the second-floor?", a:"x-x-x cast body reprimanded finite vs non representing?"}],
[["exp.act.intr.241", 141], "Maze", {s:"When did the housekeeper vacuum on the second-floor?", a:"x-x-x feel hope encompassed finite vs vote universities?"}],
[["exp.act.tran.242", 142], "Maze", {s:"What did the doctor floss at the dentist visit?", a:"x-x-x stop body indeed ramps lake seen commission myself?"}],
[["exp.act.intr.242", 142], "Maze", {s:"When did the doctor floss at the dentist visit?", a:"x-x-x seat gets helped ramps lake won establish nobody?"}],
[["exp.act.tran.243", 143], "Maze", {s:"What did the masseuse knead at the spa?", a:"x-x-x stop body uprooted coves holy shot hoc?"}],
[["exp.act.intr.243", 143], "Maze", {s:"When did the masseuse knead at the spa?", a:"x-x-x seat gets strafing coves holy gone akin?"}],

// fillers:

[["fill.psych.tran", 401], "Maze", {s:"Who did the janitor agitate during the assembly?", a:"x-x-x oil lake flanked pelican senate hurt believes?"}],
[["fill.psych.tran", 402], "Maze", {s:"Who did the patient appreciate during her hospital visit?", a:"x-x-x port seat located republican bought hurt republic shown?"}],
[["fill.psych.tran", 403], "Maze", {s:"Who did the conductor annoy while he was driving?", a:"x-x-x wood army adulthood lipid worst goal via dollars?"}],
[["fill.psych.tran", 404], "Maze", {s:"Who did the agent disappoint after the premiere?", a:"x-x-x area army forth domination sorry add wondered?"}],
[["fill.psych.tran", 405], "Maze", {s:"Who did the volunteer trust after the accident?", a:"x-x-x sea army activated trans brown add believed?"}],
[["fill.psych.tran", 406], "Maze", {s:"Who did the mayor provoke during the pandemic?", a:"x-x-x sea army hence fossils scored know predicts?"}],
[["fill.psych.tran", 407], "Maze", {s:"Who did the dragon terrify after the battle?", a:"x-x-x jobs lake denied cabling sorry ways indeed?"}],
[["fill.psych.tran", 408], "Maze", {s:"Who did the attorney confuse during the trial?", a:"x-x-x eye foot answered equator estate sit apply?"}],
[["fill.psych.tran", 409], "Maze", {s:"Who did the psychic hypnotize at the fair?", a:"x-x-x oil foot opposes preempted lots gone none?"}],
[["fill.psych.tran", 410], "Maze", {s:"Who did the journalist respect at the press conference?", a:"x-x-x ice foot maintained senator skin role guess democratic?"}],
[["fill.psych.tran", 411], "Maze", {s:"Who did the paralegal embarrass before the trial?", a:"x-x-x jobs wife backfired coworkers closer plan apply?"}],
[["fill.psych.tran", 412], "Maze", {s:"Who did the kids disturb after school?", a:"x-x-x sea skin died soluble worst united?"}],
[["fill.psych.tran", 413], "Maze", {s:"Who did the dean charm at the board meeting?", a:"x-x-x ways foot hung hardy wild sold tried traffic?"}],
[["fill.psych.tran", 414], "Maze", {s:"Who did the leader prize during the ceremony?", a:"x-x-x wild van caused mines latest came obsessed?"}],
[["fill.psych.tran", 415], "Maze", {s:"Who did the orderly comfort when he arrived at work?", a:"x-x-x ways foot expands awarded copy al knowing hall rise?"}],
[["fill.psych.tran", 416], "Maze", {s:"Who did the president resent during the election?", a:"x-x-x jobs van continues hernia nights deal includes?"}],
[["fill.psych.tran", 417], "Maze", {s:"Who did the citizens idolize during the debate?", a:"x-x-x port van answered nitride length base handle?"}],
[["fill.psych.tran", 418], "Maze", {s:"Who did the board distrust after the meeting?", a:"x-x-x ice van threw arterial thank hall exactly?"}],
[["fill.psych.tran", 419], "Maze", {s:"Who did the girl mourn after the car accident?", a:"x-x-x ice bank sent humid hotel hall lots honestly?"}],
[["fill.psych.tran", 420], "Maze", {s:"Who did the nurse perplex in the emergency room?", a:"x-x-x ice skin tends bisects vs done continues holy?"}],
[["fill.unerg.intr", 501], "Maze", {s:"Why was the scholar smiling after the presentation?", a:"x-x-x card plan chaired filters allow push considerably?"}],
[["fill.unerg.intr", 502], "Maze", {s:"Why was the boy chuckling while he cleaned?", a:"x-x-x unit hall slid quadratic goals add analyst?"}],
[["fill.unerg.intr", 503], "Maze", {s:"Why was the mechanic sweating before he started work?", a:"x-x-x road stop finishes weekends nation grow private site?"}],
[["fill.unerg.intr", 504], "Maze", {s:"Why was the traveler walking for so long?", a:"x-x-x trip deal coincide efforts cash grow rise?"}],
[["fill.unerg.intr", 505], "Maze", {s:"Why was the janitor weeping after his shift?", a:"x-x-x half size compose harsher basis sold trans?"}],
[["fill.unerg.intr", 506], "Maze", {s:"Why were the scouts marching during the early morning?", a:"x-x-x area plan relies fairness minute grow loved ability?"}],
[["fill.unerg.intr", 507], "Maze", {s:"Why was the father relaxing on a Tuesday afternoon?", a:"x-x-x job grow showed dolphins mm draw besides committed?"}],
[["fill.unerg.intr", 508], "Maze", {s:"Why was the soldier sitting near the tree?", a:"x-x-x fact ride herself digital wear copy runs?"}],
[["fill.unerg.intr", 509], "Maze", {s:"Why was the bartender frowning as he poured the drinks?", a:"x-x-x area fall resembles bindings gain trip chicks grow manage?"}],
[["fill.unerg.intr", 510], "Maze", {s:"Why was the homeowner snoring so loudly?", a:"x-x-x idea ride intersect openers cool liners?"}],
[["fill.unerg.intr", 511], "Maze", {s:"Why was the jeweler whistling as he worked?", a:"x-x-x hair hall regroup patrolled jobs rise prices?"}],
[["fill.unerg.intr", 512], "Maze", {s:"Why was the teenager yawning during class?", a:"x-x-x base view combines denials senate coast?"}],
[["fill.unerg.intr", 513], "Maze", {s:"Why was the parent sleeping all day?", a:"x-x-x ice meet thus counties tax deal?"}],
[["fill.unerg.intr", 514], "Maze", {s:"Why was the camper swimming in the middle of the night?", a:"x-x-x area tree spoons websites true copy expect find done apply?"}],
[["fill.unerg.intr", 515], "Maze", {s:"Why was the patient snoring when the nurse entered his room?", a:"x-x-x hair step herself mediums port size hence digital done goes?"}],
[["fill.unerg.intr", 516], "Maze", {s:"Why was the daughter waiting for her mom after school?", a:"x-x-x wind tree includes conduct same know laws metal region?"}],
[["fill.unerg.intr", 517], "Maze", {s:"Why was the worker grinning as he left his office?", a:"x-x-x male deal adjust evacuees fans pass holy fan anyone?"}],
[["fill.unerg.intr", 518], "Maze", {s:"Why were the counselors coughing after the bonfire?", a:"x-x-x unit ride immunology ceramics thank role lobbied?"}],
[["fill.unerg.intr", 519], "Maze", {s:"Why was the baker sniffling during his shift at the cafe?", a:"x-x-x male whom watts lifeless impact via forth tell goes vary?"}],
[["fill.unerg.intr", 520], "Maze", {s:"Why was the editor bawling as he read the story?", a:"x-x-x wind ride metres intents heat pass huge camp bring?"}],

["completion", "Form", {continueMessage: null, html: { include: "completion.html" } } ]

// leave this bracket - it closes the items section
];

// prolific page URL: 
