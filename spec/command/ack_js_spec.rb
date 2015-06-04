require 'spec_helper'

describe 'ack.js', type: :aruba  do
  let(:command) { 'ack.js' }

  context 'with two .js files and a .txt file' do
    let!(:thing) { write_file('thing.js', '') }
    let!(:thang) { write_file('thang.js', '') }
    let!(:thong) { write_file('thong.txt', '') }

    describe 'when run with -d1 -q=.js' do
      let(:command_params) { '-d1 -q=.js' }

      it 'finds the js files' do
        run_simple "#{command} #{command_params}"

        assert_partial_output('thing.js', all_output)
        assert_partial_output('thang.js', all_output)
      end

      it 'does not find the txt file' do
        run_simple "#{command} #{command_params}"

        assert_no_partial_output('thong.txt', all_output)
      end
    end
  end

end
