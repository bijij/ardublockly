
import xml.etree.ElementTree as ET
import xml.dom.minidom as minidom


def render_value(block, value):
    """Renderes a value and appends it to the block"""

    # if value is int
    try:
        int(value)
        new_block = ET.SubElement(block, 'block')
        new_block.set('type', 'math_number')
        field = ET.SubElement(new_block, 'field')
        field.set('name', 'NUM')
        field.text = value

        return
    except:
        pass

    # otherwise render as raw code
    new_block = ET.SubElement(block, 'block')
    new_block.set('type', 'raw_output')
    field = ET.SubElement(new_block, 'field')
    field.set('name', 'CODE')
    field.text = value


def render_block(stack, code):
    """Renders a block and appends it to the stack"""

    block = ET.SubElement(stack, 'block')

    # if a known block render as such

    # if statement
    if code.tag == 'if':

        def add_condition(block, code, name):
            if_tag = ET.SubElement(block, 'value')
            if_tag.set('name', name)
            render_value(if_tag, ET.tostring(code.find('condition'),
                                             encoding='unicode', method='text')[1:-1])

        def add_statement(block, code, name):
            do_tag = ET.SubElement(block, 'statement')
            do_tag.set('name', name)
            render_blocks(do_tag, code)

        mutations = [0, 0]
        block.set('type', 'controls_if')

        # initial if statement
        add_condition(block, code, 'IF' + str(mutations[0]))
        add_statement(block, code.find('then').find(
            'block'), 'DO' + str(mutations[0]))

        # add else statements
        for child in code.findall('elseif'):
            child = child.find('if')
            mutations[0] += 1
            add_condition(block, child, 'IF' + str(mutations[0]))
            add_statement(block, child.find('then').find(
                'block'), 'DO' + str(mutations[0]))

        # add else statement
        for child in code.iter('else'):
            add_statement(block, child.find('block'), 'ELSE')
            mutations[1] = 1

        # add mutations
        mutation = ET.Element('mutation')
        mutation.set('elseif', str(mutations[0]))
        mutation.set('else', str(mutations[1]))
        block.insert(0, mutation)

    # for loop
    elif code.tag == "for":
        block.set('type', 'controls_for')

        control = code.find('control')

        # set the variable name
        var = ET.SubElement(block, 'field')
        var.set('name', 'VAR')
        var.text = control[0][0][0].text

        def add_value(block, value, name):
            tag = ET.SubElement(block, 'value')
            tag.set('name', name)
            render_value(tag, value)

        # set the from
        add_value(block, control[0][0][2].text, 'FROM')
        # set the to
        add_value(block, control[1][0][2].text, 'TO')

        # set the by
        # operator starts with -
        if control[2][0][1].text in ["++", "--"]:
            value = '1'
        else:
            value = control[2][0][2].text

        add_value(block, value, 'BY')

        # render the child elements
        do_tag = ET.SubElement(block, 'statement')
        do_tag.set('name', 'DO')
        render_blocks(do_tag, code.find('block'))



    # otherwise render as raw code
    else:
        block.set('type', 'raw_code')
        field = ET.SubElement(block, 'field')
        field.set('name', 'CODE')
        field.text = ET.tostring(code, encoding='unicode', method='text')[
            :-1].rstrip()

    return block


def render_blocks(stack, blocks):
    """Renders a set of blocks"""

    i = 0
    for block in blocks:
        if i == 0:
            prev = render_block(stack, block)

        else:
            # add next
            nextblock = ET.SubElement(prev, 'next')
            prev = render_block(nextblock, block)
        i += 1


def render_xml(filename) -> str:
    """Render XML input in ardublockly format

    :param filename: filename of file containing XML to convert
    :return: str with formatted ardublockly XML to convert to blocks
    """
    tree = ET.parse(filename)
    root = tree.getroot()

    output = ET.Element('xml')
    output.set('xmlns', "http://www.w3.org/1999/xhtml")
    functions = ET.SubElement(output, 'block')
    functions.set('type', 'arduino_functions')

    i = 0
    # render functions
    for child in root.iter('function'):

        # check if setup function
        if child[1].text == 'setup':
            stack = ET.SubElement(functions, 'statement')
            stack.set('name', 'SETUP_FUNC')

        # check if loop function
        elif child[1].text == 'loop':
            stack = ET.SubElement(functions, 'statement')
            stack.set('name', 'LOOP_FUNC')

        # otherwise treat as a custom function
        else:

            func = ET.SubElement(output, 'block')
            func.set('type', 'procedures_defreturn')

            name = ET.SubElement(func, 'field')
            name.set('name', 'NAME')
            name.text = child[1].text

            stack = ET.SubElement(func, 'statement')
            stack.set('name', 'STACK')

        render_blocks(stack, child.find('block'))

    for child in root.iter('decl_start'):
        pass

    # return final XML
    rough_string = ET.tostring(output, encoding='unicode')
    reparsed = minidom.parseString(rough_string)
    return reparsed.toprettyxml(indent='  ')
