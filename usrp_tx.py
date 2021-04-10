
#!/usr/bin/env python2
# -*- coding: utf-8 -*-
##################################################
# GNU Radio Python Flow Graph
# Title: Top Block
# GNU Radio version: 3.7.13.5
##################################################

from gnuradio import blocks
from gnuradio import eng_notation
from gnuradio import gr
from gnuradio import uhd
from gnuradio.eng_option import eng_option
from gnuradio.filter import firdes
from optparse import OptionParser
import sys
import pmt
import time

# cfreq = 5765000000 channel 153
# cfreq = 5220000000 channel 44
# samp_rate = 20000000
class top_block(gr.top_block):

    def __init__(self,cfreq,samp_rate,gain,filename):

	# samp_rate = float(samp_rate)

        gr.top_block.__init__(self, "Top Block")
        ##################################################
        # Variables
        ##################################################
        # self.samp_rate = samp_rate
        ##################################################
        # Blocks
        ##################################################
        self.uhd_usrp_sink_0 = uhd.usrp_sink(
        	",".join(("", "")),
        	uhd.stream_args(
        		cpu_format="fc32",
        		channels=range(1),
        	),
        )
        self.uhd_usrp_sink_0.set_samp_rate(samp_rate)
        self.uhd_usrp_sink_0.set_center_freq(cfreq, 0)
        self.uhd_usrp_sink_0.set_gain(gain, 0)
        self.uhd_usrp_sink_0.set_antenna('TX/RX', 0)
        self.uhd_usrp_sink_0.set_bandwidth(samp_rate, 0)
        self.blocks_file_source_0 = blocks.file_source(gr.sizeof_gr_complex*1, filename, True)
        self.blocks_file_source_0.set_begin_tag(pmt.PMT_NIL)
        ##################################################
        # Connections
        ##################################################
        self.connect((self.blocks_file_source_0, 0), (self.uhd_usrp_sink_0, 0))

    def set_samp_rate(samp_rate):
	    self.samp_rate = samp_rate


def usrp_tx(cfreq,samp_rate,gain,filename):
    tb = top_block(cfreq,samp_rate,gain,filename)
    tb.start()
    try:
        raw_input('Press Enter to quit: ')
    except EOFError:
        pass
    tb.stop()
    tb.wait()

def main(cfreq,samp_rate,gain,filename):
    usrp_tx(float(cfreq), float(samp_rate), float(gain), filename)

if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4])
